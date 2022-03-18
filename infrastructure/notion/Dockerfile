FROM node:17.7.1


COPY infrastructure/notion/package.json .
COPY infrastructure/notion/package-lock.json .


WORKDIR /workspace/notion

CMD [ "/usr/local/bin/node", "main.js"]