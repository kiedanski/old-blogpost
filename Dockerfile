FROM node:17.7.1


WORKDIR /core
COPY package.json /core
COPY package-lock.json /core

RUN npm install

COPY main.js /core
COPY utils.js /core
ENTRYPOINT [ "node", "/core/main.js" ]
