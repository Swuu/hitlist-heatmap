exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome',

    // Number of times to run this set of capabilities (in parallel, unless
    // limited by maxSessions). Default is 1.
    count: 1,

    //configure chrome driver to ignore certificate errors (--ignore-certificate-errors)
    'chromeOptions': {
        args: ['--test-type']
    }
  },

  // capabilities: {
    // 'browserName': 'phantomjs',

    /* 
     * Can be used to specify the phantomjs binary path.
     * This can generally be ommitted if you installed phantomjs globally.
     */
    // 'phantomjs.binary.path':'./node_modules/phantomjs/bin/phantomjs',

    /*
     * Command line arugments to pass to phantomjs. 
     * Can be ommitted if no arguments need to be passed. 
     * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
     */
  //   'phantomjs.cli.args':['--logfile=webdriver.log', '--loglevel=DEBUG']
  // },

  // If you would like to run more than one instance of WebDriver on the same
  // tests, use multiCapabilities, which takes an array of capabilities.
  // If this is specified, capabilities will be ignored.
  multiCapabilities: [],

  chromeOnly: true,

  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
