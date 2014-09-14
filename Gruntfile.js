'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9000,
          livereload: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      target: {
        files: ['index.html', 'css/**/*.css', 'js/**/*.js']
      }
    },
	open: {
      server: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['connect','open', 'watch']);
};
