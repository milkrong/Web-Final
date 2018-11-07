module.exports = {
    "extends": "standard",
    "plugins":[
        "html"
    ],
    "parser": "babel-eslint",
    "env": { "es6": true },
    "rules": {
        //"off" or 0 - turn the rule off
        //"warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
        //"error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
  
        //require the use of === and !==
        "eqeqeq" : 0,
        "one-var": 0,
    }
};