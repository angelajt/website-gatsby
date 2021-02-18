all:

test:
	gatsby develop

build:
	cd ~/lab/gatsby/gatsby-docker/; docker build -t angelat/gatsby:onbuild -f Dockerfile.onbuild .
	docker push angelat/gatsby:onbuild
	cd ~/lab/gatsby/gatsby-docker/; docker build -t angelat/gatsby:vanilla -f Dockerfile .
	docker push angelat/gatsby:vanilla

deploy:
	gatsby build
	docker build -t angelat/website:latest .
	docker push angelat/website:latest
	ssh truffle.ajt.t7a.org docker kill angelajt.com || true
	ssh truffle.ajt.t7a.org docker pull angelat/website
	ssh truffle.ajt.t7a.org docker run --rm -p 80:80 --name angelajt.com -d angelat/website:latest
