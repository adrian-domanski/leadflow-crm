docker-hard-reset:
	docker-compose down -v
	docker builder prune -a -f
	docker-compose build --no-cache
	docker-compose up -d