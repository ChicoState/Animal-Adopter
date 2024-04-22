// jest.config.js
module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest" // Ensure all .js and .jsx files are transformed using babel-jest
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mock style imports
    },
    testEnvironment: "jest-environment-jsdom" // Simulate a browser environment
  };  