FROM     node:8.11.4-alpine
WORKDIR  /app
EXPOSE   80

COPY     package*.json ./
RUN      [ "mkdir", ".session-cache" ]
RUN      [ "npm", "install" ]

COPY     . .

CMD      [ "npm", "start" ]