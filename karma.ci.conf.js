module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'karma-typescript'],
    concurrency: 3,
    colors: true,
    logLevel: config.LOG_INFO,
    files: [
      { pattern: 'src/js/**/*.js' },
      { pattern: 'test/**/*.spec.js' }
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: [ "--no-sandbox" ]
      },
      'SL_WINDOWS_IE10': {
        base: 'SauceLabs',
        browserName: 'Internet Explorer',
        version: '10.0',
        platform: 'Windows 8',
      },
      'SL_WINDOWS_IE11': {
        base: 'SauceLabs',
        browserName: 'Internet Explorer',
        version: '11.0',
        platform: 'Windows 10',
      },
      'SL_WINDOWS_CHROME': {
        base: 'SauceLabs',
        browserName: 'Chrome',
        version: 'latest',
        platform: 'Windows 10',
      },
      'SL_LINUX_FIREFOX': {
        base: 'SauceLabs',
        browserName: 'Firefox',
        version: 'latest',
        platform: 'Linux',
      },
      'SL_MACOS_CHROME': {
        base: 'SauceLabs',
        browserName: 'Chrome',
        version: 'latest',
        platform: 'macOS 10.13',
      },
      /*
      'SL_MACOS_SAFARI': {
        base: 'SauceLabs',
        browserName: 'Safari',
        version: 'latest',
        platform: 'macOS 10.13',
      },
      */
    },
    // Chrome, ChromeCanary, Firefox, Opera, Safari, IE
    browsers: ['ChromeHeadlessNoSandbox',
      'SL_WINDOWS_IE10', 'SL_WINDOWS_IE11', 'SL_WINDOWS_CHROME',
      'SL_LINUX_FIREFOX', 'SL_MACOS_CHROME',
    ],
    sauceLabs: {
      testName: 'unit tests for summernote',
      startConnect: false,
      username: 'summernoteis',
      accessKey: '3d57fd7c-72ea-4c79-8183-bbd6bfa11cc3',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      build: process.env.TRAVIS_BUILD_NUMBER,
      tags: [process.env.TRAVIS_BRANCH, process.env.TRAVIS_PULL_REQUEST],
    },
    preprocessors: {
      'src/js/**/*.js': ['karma-typescript'],
      'test/**/*.spec.js': ['karma-typescript']
    },
    reporters: ['dots', 'karma-typescript', 'coverage', 'coveralls'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      includeAllSources: true
    },
    browserNoActivityTimeout: 60000,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      include: [
        'test/**/*.spec.js'
      ],
      bundlerOptions: {
        entrypoints: /\.spec\.js$/,
        transforms: [require("karma-typescript-es6-transform")()],
        exclude: [
          'node_modules'
        ],
        sourceMap: true,
        addNodeGlobals: false
      },
      compilerOptions: {
        "module": "commonjs"
      }
    }
  });
};