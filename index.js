/**
 * Metalsmith Handlebars Contents - Process markdown in your contents
 *
 *   var handlebarsContents = require("metalsmith-handlebars-contents");
 *
 *   // Create your Metalsmith instance and add this like other middleware.
 *   metalsmith.use(handlebarsContents({
 *       // All options are optional. Defaults are listed here
 *       data: [],
 *       decorators: [],
 *       helpers: [],
 *       match: '**' + '/*.md', // Had to break this up to embed in a comment
 *       matchOptions: {},
 *       partials: ['./partials/**' + '/*']
 *   });
 *
 * `match` and `matchOptions` are used by metalsmith-plugin-kit to match files.
 *
 * Individual items in `data`, `decorators`, `helpers`, and `partials` will be
 * passed to the matching function in handlebars-wax.
 */
"use strict";

var debug, handlebars, handlebarsWax, pluginKit;

debug = require("debug")("metalsmith-handlebars-contents");
pluginKit = require("metalsmith-plugin-kit");
handlebars = require("handlebars");
handlebarsWax = require("handlebars-wax");

module.exports = function(options) {
    const waxKeys = ['data', 'decorators', 'helpers', 'partials'];
    var hb, templates;

    options = pluginKit.defaultOptions(
        {
            data: [],
            decorators: [],
            helpers: [],
            match: "**/*.md",
            matchOptions: {},
            partials: ["./partials/**/*"]
        },
        options
    );

    waxKeys.forEach(key => {
        if (!Array.isArray(options[key])) {
            const oldVal = options[key];

            if (oldVal) {
                options[key] = [oldVal];
            } else {
                options[key] = [];
            }
        }
    });

    return pluginKit.middleware({
        before() {
            hb = handlebarsWax(handlebars.create());
            waxKeys.forEach(key => {
                if (options[key].length) {
                    debug("Loading " + key);
                    options[key].forEach(v => {
                        try {
                            hb[key](v);
                        } catch (e) {
                            console.log("Encountered error: " + e.toString());
                        }
                    });
                } else {
                    debug("No config found for " + key);
                }
            });
            debug("Ready");
        },
        each(filename, file) {
            debug("Processing: " + filename);
            const source = file.contents.toString();
            file.contents = '';
            const compiled = hb.compile(source);
            file.contents = Buffer.from(compiled(file));
        },
        match: options.match,
        matchOptions: options.matchOptions,
        name: "metalsmith-handlebars-contents"
    });
};
