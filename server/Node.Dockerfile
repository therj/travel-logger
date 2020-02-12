FROM node:12.15.0

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install
COPY . .


# docker-compose command will override this
# CMD ["npm", "run", "dev"]


