FROM node:14

WORKDIR /app

# Install app dependencies
COPY package*.json /app
RUN npm install

COPY .  /app

EXPOSE 5000

CMD [ "node", "server.js", "--experimental-repl-await" ]
