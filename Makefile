#
# Simple Makefile
#

PROJECT = dotpath

VERSION = $(shell jq .version codemeta.json | cut -d\"  -f 2)

BRANCH = $(shell git branch | grep "* " | cut -d\   -f 2)

build: version.go

version.go: .FORCE
	@echo "package $(PROJECT)" >version.go
	@echo '' >>version.go
	@echo 'const Version = "v$(VERSION)"' >>version.go
	@echo '' >>version.go
	@if [ -f bin/codemeta ]; then ./bin/codemeta; fi

test:
	go test

status:
	git status

save:
	if [ "$(msg)" != "" ]; then git commit -am "$(msg)"; else git commit -am "Quick Save"; fi
	git push origin $(BRANCH)

website:
	./mk-website.bash

publish:
	./mk-website.bash
	./publish.bash

.FORCE: