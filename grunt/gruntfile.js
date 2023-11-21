module.exports = function(grunt) {
  grunt.initConfig({  //必须传给initConfig函数
    pkg: grunt.file.readJSON('package.json'), //读取配置文件
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      myCSSDist: {
        src: ['css/*.css'],
        dest: 'css/concat/<%= pkg.name %>-<%= pkg.version %>.css'
      },
      myJSDist: {
        src: ['js/*.js'],
        dest: 'js/concat/<%= pkg.name %>-<%= pkg.version %>.js'
      },      
    },
  });
  
  //加载要执行的插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  
   // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat']);
};