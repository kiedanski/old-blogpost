FROM node:17.7.1
ENV NODE_PATH=/install/node_modules

RUN mkdir /install

ADD infrastructure/notion/package.json /install
WORKDIR /install
RUN npm install --verbose

WORKDIR /workspace

COPY notion /workspace/notion


CMD [ "/usr/local/bin/node", "notion/main.js"]