module.exports = function (grunt)
{
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner:
        '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %>\n' +
        ' * Built on <%= grunt.template.today("dd mmm yyyy") %>\n' +
        ' */\n'
      },
      plugin: {
        files: {
          'src/ngParallax.min.js': ['src/ngParallax.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['uglify']);
};
