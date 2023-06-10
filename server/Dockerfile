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
WORKDIR /app
COPY package.json /app/
RUN npm install --production
COPY . /app
RUN cd /app
RUN ls
RUN npm run build
CMD ["node", "./dist/index.js"]

