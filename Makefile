default:
	echo "make [watch]"

watch:
	browser-sync -c bs-config.js

.PHONY: default watch
