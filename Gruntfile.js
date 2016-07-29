module.exports = function (grunt) {

  grunt.initConfig({
    rio: {
      ngMainModule: 'hitlist-heatmap'
    }
  });

  // Load npm default options
  grunt.loadNpmTasks('@itunes/rio-grunt-plugin');

  grunt.config.merge({

    sass: {
      dist: {
          files: {
              'src/static/css/style.css': 'src/static/scss/app.scss'
          }
      }
    },

    uglify: {
      options: {
        mangle: false
      }
    },
    'gr-server': {
      options: {
        redirectRootToApp: true, // Don't care about the welcome app
        // srcDir: '.tmp', // Uncomment to test temporary build output
        // port: 3000, 3000 is default
        proxies: {
          '*': { // Served under http://.../iplookup
            mode: 'proxy', // 'record' | 'mock' | 'proxy' | 'mockrecord' ...if in record modes, saves results to /api
            delay: 0, // Delay requests in milliseconds to mimic slow APIs, test UI loaders etc.
            // url: 'https://itms8-greenroom.itunes.apple.com/api'
            url: 'http://localhost:9999/api'
          }
        }
      },
      src: {} // we need a grunt "target"
    },
    watch: {
      'gr-server': {
        files: ['Gruntfile.js'],
        tasks: ['gr-server'],
        options: {
          spawn: false, // Important to close down previous process to not have a race condition on port
          reload: true
        }
      },
      livereload: {
        // If you have bower linked to other libraries, add them below to trigger reload
        files: ['src/**/*.+(js|html|css)', '!src/static/bower_components/**/*'],
        options: {
          livereload: true
        }
      },
      lint: {
        // Edit the .jshintrc file to change JavaScript styles and behavior
        files: ['src/static/**/*.js', '!src/static/bower_components/**/*'],
        tasks: ['lint']
      },
      sass: {
            files: 'src/static/scss/*.scss',
            tasks: ['sass']
        }
    },

    karma: {
      ci: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      unit: {
        configFile: 'test/karma.conf.js',
        reporters: ['progress','osx']
      },
      chrome: {
        configFile: 'test/karma.conf.js',
        browsers: ['Chrome']
      }
    },

    jshint: {
      all: ['src/static/js/*.js']
    }
  });


  grunt.registerTask('server', ['gr-server:src', 'watch']);
  grunt.registerTask('default', 'server');

  // Override the "build" workflow by triggering the "usemin app" predefined builds
  grunt.registerTask("build", "buildJsNgApp");
  //grunt.registerTask("test", "karma:ci");
  grunt.registerTask('test', ['jshint']);

  grunt.loadNpmTasks('grunt-contrib-watch');
};