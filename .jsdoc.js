'use strict'

module.exports = {
    "plugins": ['plugins/markdown'],
    "recurseDepth": 10,
    "source": {
        "include": ['src'],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    },
    "opts": {
        "destination": "./doc/",
    }
}
