FROM node:12.15.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Make app available to other containers within links
# EXPOSE 2999

# CMD ["npm", "run", "dev"]

# Debugger must be attached for it to even respond
# CMD ["npm", "run", "debug"]

# Same as above but binds to all interfaces
CMD ["npm", "run", "debug:all"]


FROM mongo:4.2.3

# Make app available to other containers within links
EXPOSE 27017
