FROM node:17.7.1
ENV NODE_PATH=/install/node_modules

RUN apt-get update && apt-get install -y python3 python3-pip
RUN python3 -m pip install pillow

RUN mkdir /install

ADD infrastructure/notion/package.json /install
WORKDIR /install
RUN npm install --verbose


WORKDIR /workspace

COPY notion /workspace/notion


CMD [ "/bin/bash", "notion/get_posts.sh"]