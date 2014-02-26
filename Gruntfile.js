'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({
		// Project settings
		ame: {
			// configurable paths
			public: 'public',
			dist: 'dist',
			css: 'styles',
			font: 'fonts',
			js: 'scripts',
			server: 'server.js',
			index: 'index.html',
			default_port: 8005
		},

		express: {
			options: {
				port: process.env.PORT || 8005
			},
			dev: {
				options: {
					script: 'server.js',
					debug: true
				}
			},
			prod: {
				options: {
					script: '<%= ame.dist %>/server.js',
					node_env: 'production'
				}
			}
		},

		open: {
			server: {
				url: 'http://localhost:<%= express.options.port %>'
			}
		},

		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			compass: {
				files: ['<%= ame.public %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:dev']
			},
			jade: {
				files: ['<%= ame.public %>/views/{,*/}*.jade','<%= ame.public %>/index.jade'],
				tasks: ['jade']
			},
			livereload: {
				files: [
					'<%= ame.public %>/{,*//*}*.html',
					'<%= ame.public %>/views/{,*//*}*.html',
					'{.tmp,<%= ame.public %>}/styles/{,*//*}*.css',
					'{.tmp,<%= ame.public %>}/scripts/{,*//*}*.js',
					'<%= ame.public %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
				],

				options: {
					livereload: true
				}
			},
			express: {
				files: [
					'server.js',
					'lib/**/*.{js,json}'
				],
				tasks: ['express:dev'],
				options: {
					livereload: true,
					nospawn: true //Without this option specified express won't be reloaded
				}
			}
		},
		

		//install all vendor's js/css into html automatically
		'bower-install': {
			target: {
				src: '<%= ame.public %>/index.html', // point to your HTML file.
				ignorePath: '<%= ame.public %>/'
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= ame.public %>/styles',
				cssDir: '<%= ame.public %>/styles',
				generatedImagesDir: '<%= ame.public %>/images/generated',
				imagesDir: '<%= ame.public %>/images',
				javascriptsDir: '<%= ame.public %>/scripts',
				fontsDir: '<%= ame.public %>/fonts',
				importPath: '<%= ame.public %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},
			dist: {
				options: {
					debugInfo: false
				}
			},
			dev: {
				options: {
					debugInfo: true
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= ame.public %>',
						dest: '<%= ame.dist %>/<%= ame.public %>',
						src: [
							'**/*.{ico,png,txt,html,jpg}',
							'**/theme.css'
						]
					},
					{
						expand: true,
						dest: '<%= ame.dist %>',
						src: [
							'package.json',
							'server.js',
							'lib/**/*'
						]
					},
					{
						expand: true,
						cwd: '<%= ame.public %>/bower_components/bootstrap-sass-no-js/dist',
						dest: '<%= ame.dist %>/<%= ame.public %>',
						src: [
							'fonts/**/*'
						]
					},
					{
						expand: true,
						cwd: '<%= ame.public %>/styles',
						dest: '<%= ame.dist %>/<%= ame.public %>/styles',
						src: [
							'fonts/**/*'
						]
					}
				]
			}
		},

		// Compile jade to html
		jade: {
			compile: {
				options: {
					pretty: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= ame.public %>',
						src: ['**/*.jade'],
						dest: '<%= ame.public %>',
						ext: '.html'
					}
				]}
		},

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/concat/scripts',
						src: '*.js',
						dest: '.tmp/concat/scripts'
					}
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= ame.public %>/index.html',
			options: {
				dest: '<%= ame.dist %>/<%= ame.public %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= ame.dist %>/<%= ame.public %>/{,*/}*.html'],
			css: ['<%= ame.dist %>/<%= ame.public %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= ame.dist %>/<%= ame.public %>']
			}
		}



	});

	grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
		this.async();
	});

	//only for testing production build
	grunt.registerTask('stage', function (target) {
		grunt.task.run(['build', 'express:prod', 'express-keepalive']);

	});

	grunt.registerTask('serve', function (target) {
		grunt.task.run(['jade','compass:dev','bower-install', 'express:dev', 'open','watch']);

	});

	grunt.registerTask('build', ['jade', 'bower-install', 'compass:dist', 'useminPrepare', 'concat', 'ngmin', 'cssmin', 'uglify', 'copy', 'usemin']);
	grunt.registerTask('default', ['build']);
};