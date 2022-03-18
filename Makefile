docker-jekyll:
	docker build -f infrastructure/jekyll/Dockerfile -t blog-jekyll .


docker-notion:
	docker build -f infrastructure/notion/Dockerfile -t blog-notion .