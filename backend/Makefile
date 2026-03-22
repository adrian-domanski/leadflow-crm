dev:
	uvicorn app.main:app --reload

up-db:
	docker-compose -f docker-compose.dev.yml up db

up:
	docker-compose -f docker-compose.dev.yml up

clean:
	docker-compose -f docker-compose.dev.yml down -v --rmi all --remove-orphans

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

