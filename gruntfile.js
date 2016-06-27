module.exports = function(grunt) {
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    jshint: {
      all: ['src/js/*.js']
    },

    less: {
      build: {
        options: {
          paths: ["css"]
        },
        files: {
          "dist/css/<%= pkg.name %>.css": "src/less/<%= pkg.name %>.less"
        }
      }
    },

    uglify: {
      build: {
        src: 
          'src/js/*.js'
        ,
        dest: 
          'dist/js/<%= pkg.name %>.min.js'
        
      }
    },

    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    watch : {
      files: [
        "./src/less/*",
        "./src/js/*"
      ],
      tasks: [
        "less",
        "uglify",
        "cssmin"
      ]
    },

  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', 'watch');
};