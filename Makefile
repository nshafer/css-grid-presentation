default:
	echo "make [watch]"

watch:
	browser-sync -c bs-config.js

deploy:
	git pull --ff-only

.PHONY: default watch deploy
