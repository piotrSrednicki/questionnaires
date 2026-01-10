FROM python:3.13-slim

RUN useradd -ms /bin/bash user
USER user

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["/app/entrypoint.sh"]
