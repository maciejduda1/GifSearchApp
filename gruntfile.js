module.exports = function(grunt) {
grunt.initConfig({
	jshint: {
		all: ['js/*.js']
    },

    browserSync: {
    	dev: {
     		bsFiles: {
        		src : [
            		'css/*.css',
            		'./*.html',
            		'js/*.js',
            	]
     		},
			options: {
        		watchTask: true,
        		server: './'
     		}
    	}
	},
   
	sass: {
    	options: {
    		sourceMap: true
    	},
    	dist: {
    		files: {
       			'css/style.css': 'sass/style.scss'
    		}
    	}
  	},

	watch: {
		scripts: {
        	files: ['sass/*.scss'],
  			    tasks: ['sass'],
        		options: {
       			    spawn: false,
        		},
    	}
	}
});
// Load the plugins tasks
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-browser-sync');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
// Default task(s).
grunt.registerTask('default', [ 'jshint', 'browserSync','sass', 'watch']);

};