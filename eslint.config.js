import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/", "coverage/"]
    },
    js.configs.recommended,
    {
        files: ["src/**/*.js"],
        languageOptions: {
            globals: globals.browser
        }
    },
    {
        files: ["tests/**/*.js"],
        languageOptions: {
            globals: globals.jest
        }
    }
];
