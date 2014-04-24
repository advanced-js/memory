module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: {
        src: [
        'js/collections/*.js',
        'js/models/*.js',
        'js/views/*.js',
        'js/*.js']
      }
    },
    validation: {
      options: {
        reset: true
      },
      files: {
        src: ['*.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html-validation');

  grunt.registerTask('default', ['jshint', 'validation']);
};
