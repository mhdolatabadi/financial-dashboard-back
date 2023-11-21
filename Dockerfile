FROM node:16-bullseye-slim
EXPOSE 3000
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY package*.json yarn*.lock ./
COPY --chown=node:node . .
RUN yarn && yarn build && yarn cache clean
RUN rm -f .npmrc
CMD ["node", "./dist/main.js"]