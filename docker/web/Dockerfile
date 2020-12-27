FROM node:14

WORKDIR /app


COPY .  .
# Install app dependencies

EXPOSE 5000

CMD  npm install && node server.js --experimental-repl-await
