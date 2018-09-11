FROM     node:8.11.4-alpine
WORKDIR  /app
EXPOSE   80

COPY     . .
RUN      [ "mkdir", ".session-cache" ]
RUN      [ "npm", "install" ]
RUN      [ "npm", "run", "build-sass" ]

CMD      [ "npm", "start" ]