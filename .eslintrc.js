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
        "jest"
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
    }
}