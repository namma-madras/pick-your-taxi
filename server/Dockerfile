# base
FROM node:17.0.1-alpine AS base
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . .

# release stage
FROM base AS release
RUN npm run build
RUN npm prune --production # Remove dev dependencies
COPY /app/node_modules ./node_modules
COPY /app/dist ./dist
USER node
CMD ["node", "./dist/server.js"]