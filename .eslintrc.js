module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "jest/globals": true,
        "es6": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:jest/recommended",
    ],

    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "jest",
        "fp"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        // "fp/no-arguments": "error",
        // "fp/no-class": "error",
        // "fp/no-delete": "error",
        // "fp/no-events": "error",
        // "fp/no-get-set": "error",
        // "fp/no-let": "error",
        // "fp/no-loops": "error",
        // "fp/no-mutating-assign": "error",
        // "fp/no-mutating-methods": "error",
        // "fp/no-mutation": "error",
        // "fp/no-nil": "error",
        // "fp/no-proxy": "error",
        // "fp/no-rest-parameters": "error",
        // "fp/no-this": "error",
        // "fp/no-throw": "error",
        // "fp/no-unused-expression": "error",
        // "fp/no-valueof-field": "error",
        "no-var": "error",
    }
}
