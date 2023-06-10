# FROM node:17.0.1-alpine
# WORKDIR /app
# COPY package.json /app/
# RUN npm install
# COPY . /app

# RUN npm run build
# RUN npm prune --production # Remove dev dependencies

# USER node

# CMD ["node", "./dist/index.js"]

FROM node:17.0.1-alpine
WORKDIR "/app"

# Install app dependencies
COPY package.json /app/
RUN apt-get update \
&& apt-get dist-upgrade -y \
&& apt-get clean \
&& echo 'Finished installing dependencies'
RUN cd /app; npm install --production
 
COPY . /app

CMD ["node", "./dist/index.js"]

