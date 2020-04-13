module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.graphql$": "graphql-import-node/jest"
  },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node"
};
