.PHONY: minify start stop

MAIN_CSS_FILE_NAME := style
DARK_THEME_CSS_FILE_NAME := dark-theme

MAIN_JS_FILE_NAME := script

main_css_file := $(MAIN_CSS_FILE_NAME).css
main_css_min_file := $(MAIN_CSS_FILE_NAME).min.css
dark_theme_css_file := $(DARK_THEME_CSS_FILE_NAME).css
dark_theme_css_min_file := $(DARK_THEME_CSS_FILE_NAME).min.css

main_js_file := $(MAIN_JS_FILE_NAME).js
main_js_min_file := $(MAIN_JS_FILE_NAME).min.js

minify:
	@cssnano css/$(main_css_file) css/$(main_css_min_file)
	@cssnano css/$(dark_theme_css_file) css/$(dark_theme_css_min_file)
	@uglifyjs -c -m -o js/$(main_js_min_file) js/$(main_js_file)

start:
	@docker-compose up -d --build

stop:
	@docker-compose down