module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	//MADE DIRECTORY
	mkdir: {
	    all: {
	      options: {
	        create: ['production', 'production/css','production/js']
	      }
	    }
	  },

	//SASS
	sass: {
		dist:{
			files:{
				'css/style.css': 'css/style.scss'
			}
		}
	},

	//JADE
	jade: {
		compile: {
			options: {
				data: {
					debug: false
				}
			},
		files : {
			"index.html" : ["index.jade"]
		}
	 }	
	},

	//AUTOPREFIXER
	autoprefixer: {
		options: {
			browsers:['last 3 version','ie 8','ie 9']
		},
		no_dest: {
			src: 'css/style.css'
		}
	},

	//CONNECT
	connect: {
		server: {
			options: {
				port: 9001,
				base: ''
			}
		}
	},

	//SVG INJECT
	svginject: {
	   all : {
	     options: {},
	     files: {
	        'js/SVGinject.js': ['images/*.svg'],
	     }
	   }
	 },

	//CONCATENATE FILES
	concat: {
		options: {
			separator: ';'
		},
	  css: {
	    src: ['css/*.css'],
	    dest: 'production/css/style.css'  
	  },
	  js: {
	    src: ['js/*.js'],
	    dest: 'production/js/main.js'   
	   }
	 },

	//CSS MINIFY
	cssmin: {
	  minify: {
	    expand: true,
	    cwd: 'production/css',
	    src: ['*.css', '!*.min.css'],
	    dest: 'production/css/',
	    ext: '.min.css'
	  }
	},

	//JS UGLIFY
	uglify: {
	    my_target: {
	      files: {
	        'production/js/main.min.js': ['production/js/*.js']
	      }
	    }
	  },

	//COPY
	copy: {
	  main: {
	    src: 'index.html',
	    dest: 'production/',
	  }
	},	  

	//WATCH
	watch: {
		css: {
			files: ['css/*.scss'],
			tasks: ['sass','autoprefixer']
		},
		jade: {
			files:['*.jade'],
			tasks: ['jade']
		},
		options: {
			livereload:true
		}
	}

}); //end

//STARTER
grunt.loadNpmTasks('grunt-mkdir');

//WATCH
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-svginject');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');

//PRODUCTION
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-copy');


// Default task(s).
grunt.registerTask('default', ['connect', 'watch']);
grunt.registerTask('svg', ['svginject']);
grunt.registerTask('starter',['mkdir']);
grunt.registerTask('mkprod',['concat','cssmin','uglify','copy']);

};