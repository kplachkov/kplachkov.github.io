CSS_DEV_FILE_NAME := style
JS_DEV_FILE_NAME := script

css_dev_file := $(CSS_DEV_FILE_NAME).css
js_dev_file := $(JS_DEV_FILE_NAME).js
css_min_file := $(CSS_DEV_FILE_NAME).min.css
js_min_file := $(JS_DEV_FILE_NAME).min.js

.PHONY: minify start stop

minify:
	@cssnano css/$(css_dev_file) css/$(css_min_file) && uglifyjs -c -m -o js/$(js_min_file) js/$(js_dev_file)

start:
	@docker-compose up -d --build

stop:
	@docker-compose down