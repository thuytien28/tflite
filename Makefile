.PHONY: clean pre-run

node_modules: package.json
	@if ! [ $(shell which yarn 2> /dev/null) ]; then \
		echo "yarn is not installed https://yarnpkg.com/"; \
		exit 1; \
	fi

	@echo Getting Javascript dependencies
	@yarn install

.podinstall:
ifeq ($(OS), Darwin)
ifdef POD
	@echo Getting Cocoapods dependencies;
	@cd ios && pod install;
else
	@echo "Cocoapods is not installed https://cocoapods.org/"
	@exit 1
endif
endif
	@touch $@

pre-run: | node_modules .podinstall ## Installs dependencies

clean: ## Cleans dependencies, previous builds and temp files
	@echo Cleaning started

	@rm -f .podinstall
	@rm -rf ios/Pods
	@rm -rf node_modules
	@rm -rf dist
	@rm -rf ios/build
	@rm -rf android/app/build

	@echo Cleanup finished