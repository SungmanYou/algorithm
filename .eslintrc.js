module.exports = {
    "extends": "google",
    "env": {
	"browser": true,
	"es6": true,
	"node": true
    },
    "plugins": [
	"json"
    ],
    "rules": {
	"camelcase": [0, {"properties": "never"}],
	"no-tabs": 0,
	"comma-dangle": 0,
	"no-mixed-spaces-and-tabs": 0,
	"no-trailing-spaces": 0,
	"max-len": 0, // 80
	"new-cap": 0,
	"require-jsdoc": ["error", {
            "require": {
		"FunctionDeclaration": false, // true
		"MethodDefinition": false,
		"ClassDeclaration": false,
		"ArrowFunctionExpression": false
            }
	}]
    }
};
