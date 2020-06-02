SHELL := /bin/bash
.DEFAULT_GOAL := help

#######################
# HELPER TARGETS
#######################

.PHONY: help
help:  ## help target to show available commands with information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) |  awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

#######################
# General
#######################

.PHONY: install
install: 
	npm i
	npx lerna bootstrap

.PHONY: download
download: 
	npm i -g json-serverless
	jsonsls

#######################
# Publishing
#######################

.PHONY: publish-manually
publish-manually:
ifndef GH_TOKEN
	$(error GH_TOKEN is undefined)
endif
	make install
	npx lerna version --include-merged-tags --force-publish --conventional-commits --create-release github
	npx lerna publish from-git --yes

#######################
# SERVER LIB PACKAGE
#######################

.PHONY: start-server
start-server: # execute the library locally
	npx lerna run --scope json-serverless-lib  --stream start

#######################
# CLI PACKAGE
#######################

.PHONY: start-cli
start-cli: # execute locally via cli run command
	make install
	npx lerna run --scope json-serverless  --stream start

#######################
# TEMPLATE PACKAGE
#######################

.PHONY: start-template
start-template: # execute the stack via serverless offline / serverless framework (needs to be deployed once in advance)
	lerna bootstrap 
	npx lerna run --scope json-serverless-template  --stream start

#######################
# CICD COMMANDS
#######################

.PHONY: fake-credentials
fake-credentials:
	mkdir -p ~/.aws
	touch ~/.aws/credentials
	echo -e "[default]\naws_access_key_id=xxxx\naws_secret_access_key=xxx" > ~/.aws/credentials
	echo -e "[profile default]\nregion=eu-central-1" > ~/.aws/config

.PHONY: publish
publish:
ifndef GH_TOKEN
	$(error GH_TOKEN is undefined)
endif
	make install
	git status
	npx lerna version patch -m "chore(release): Travis CI update [ci skip]" --include-merged-tags --force-publish --conventional-commits --create-release github --yes --git-remote pub
	npx lerna publish from-git --yes