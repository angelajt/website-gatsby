all:

test:
	gatsby develop

deploy:
	docker build -t angelat/website .
	docker push angelat/website
	ssh truffle.ajt.t7a.org docker kill angelajt.com || true
	ssh truffle.ajt.t7a.org docker pull angelat/website
	ssh truffle.ajt.t7a.org docker run --rm -p 80:80 --name angelajt.com -d angelat/website
