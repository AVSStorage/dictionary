FROM mongo:latest

COPY dictionary.json /dictionary.json

ONBUILD CMD mongoimport --host 127.0.0.1 --port 27017 --db test --collection dictionary  --type json --file /app/dictionary.json --jsonArray
