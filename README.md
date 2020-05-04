metalsmith-handlebars-layouts
===========================

Processes file contents with [Handlebars](https://handlebarsjs.com/). Typically used for mustache syntax embedded within markdown files, but can easily process any type of text file. Safe to use with live reloading. Very similar to [metalsmith-hbt-md](https://github.com/ahdiaz/metalsmith-hbt-md), but this is safe to use with live reloading using [metalsmith-serve](https://github.com/mayo/metalsmith-serve) and [metalsmith-watch](https://www.npmjs.com/package/metalsmith-watch).


What It Does
------------

Imagine you have some data in a page that you want to render as a table. This lets you repeat content using mustache and it can draw from the metadata of the file.

    ---
    tableData:
        -
            name: Bob
            type: Elephant
        -
            name: Sally
            type: Rhino
    ---

    Welcome to my zoo! Right now we are taking care of the following animals

    | Name | Type of Animal |
    |------|----------------|
    {{tableData}}| {{name}} | {{type }} |
    {{/tableData}}

Partials can also be used, as can helpers and other features that handlebars provides.


Installation
------------

`npm` can do this for you.

    npm install --save metalsmith-handlebars-contents


Usage
-----

Include this like you would include any other plugin.  Here's a CLI example that also shows the default options.  You don't need to specify any of these unless you want to change its value.

    {
        "plugins": {
            "metalsmith-handlebars-contents": {
                "data": [],
                "decorators": [],
                "helpers": [],
                "match": "**/*.md",
                "matchOptions": {},
                "partials": ["./partials/**/*"]
            }
        }
    }

And this is how you use it in JavaScript, with a small description of each option.

    // Load this, just like other plugins.
    var handlebarsContents = require("metalsmith-handlebars-contents");

    // Then in your list of plugins you use it.
    .use(handlebarsContents())

    // Alternately, you can specify options.  The values shown here are
    // the defaults.
    .use(handlebarsContents({
        // Data files to load or data objects to add to global data.
        data: [],

        // Decorators to add
        decorators: [],

        // Helper functions to include
        helpers: [],

        // Pattern of files to match in case you want to limit processing
        // to specific files.
        match: "**/*.md",

        // Options for matching files.  See metalsmith-plugin-kit for
        // more information.
        matchOptions: {},

        // Directories that hold partials for processing the content
        partials: ['./partials/**/*']
    })

The items in the `data`, `decorators`, `helpers`, and `partials` arrays can be strings or objects. They are passed to [handlebars-wax] using the appropriate method.

This uses [metalsmith-plugin-kit](https://github.com/tests-always-included/metalsmith-plugin-kit) to match files.  The `.matchOptions` object can be filled with options to control how files are matched.


Development
-----------

This plugin is licensed under the [MIT License][License] with an additional non-advertising clause.  See the [full license text][License] for information.

[handlebars-wax]: https://github.com/shannonmoeller/handlebars-wax
