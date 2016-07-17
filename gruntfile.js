module.exports = function(grunt) {

  grunt.initConfig({

    /**
     * Define our package
     * @type {Object}
     */
    pkg : grunt.file.readJSON('package.json'),

    /**
     * Compile LESS into CSS
     * @type {Object}
     */
    less: {
      build: {
        options: {
          paths: ["css"]
        },
        files: {
          "dist/css/<%= pkg.name %>.css" : "src/less/<%= pkg.name %>.less",
          "examples/css/demo.css" : "src/less/demo.less"
        }
      }
    },

    /**
     * Compress JS
     * @type {Object}
     */
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      build: {
        src: 
          'src/js/<%= pkg.name %>.js'
        ,
        dest: 
          'dist/js/<%= pkg.name %>.min.js'
        
      }
    },

    /**
     * Compress CSS
     * @type {Object}
     */
    cssmin: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: [
              '*.css',
              '!*.min.css'
            ],
            dest: 'dist/css',
            ext: '.min.css'
          }
        ]
      }
    },

    /**
     * Copy JS source
     * @type {Object}
     */
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "./src/js/",
            src: "<%= pkg.name %>.js",
            dest: "./dist/js/"
          }
        ]
      }
    },

    /**
     * Watch tasks array for changes
     * @type {Object}
     */
    watch: {
      files: [
        "./src/less/*",
        "./src/js/*"
      ],
      tasks: [
        "less",
        "uglify",
        "cssmin",
        "copy"
      ]
    },

  });

  /**
   * Load npm tasks
   */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Register task
   */
  grunt.registerTask('default', 'watch');

};






