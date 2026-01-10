makemigrations: ## create migration files
	docker-compose run --rm --entrypoint "python manage.py makemigrations" backend

migrate: ## apply migrations
	docker-compose run --rm --entrypoint "python manage.py migrate" backend

createsuperuser: ## create Django superuser
	docker-compose run --rm --entrypoint "python manage.py createsuperuser" backend

build-up: ## build and run all containers
	docker-compose up --build

mypy:  ## type-check backend code
	docker compose run --rm --entrypoint "" backend python -m mypy --explicit-package-bases /app

black:  ## format backend code
	docker compose run --rm --entrypoint "" backend python -m black .

flake8:  ## lint backend code
	docker compose run --rm --entrypoint "" backend python -m flake8 .

isort:  ## sort imports in backend code
	docker compose run --rm --entrypoint "" backend python -m isort .

eslint:  ## Lint frontend JS/JSX files
	docker compose run --rm frontend sh -c "npm run lint"

prettier:  ## Format frontend JS/JSX files with Prettier
	docker compose run --rm frontend sh -c "npm run format"

supercode: isort black flake8 mypy eslint prettier
	@echo "All code quality checks complete!"
