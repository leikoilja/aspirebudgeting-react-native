module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      "inline-dotenv",
      [
        "module-resolver",
        {
          "root": ["./src"],
          "alias": {
            "@actions": "./src/state/actions",
            "@const": "./src/const.ts",
            "@libs": "./src/libs",
            "@state": "./src/state",
            "@types": "./src/types.tsx",
          }
        }
      ]
    ]
  }
};
