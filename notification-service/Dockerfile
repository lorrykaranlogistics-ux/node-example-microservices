FROM node:20-alpine
WORKDIR /app
ENV NODE_PATH=/app/node_modules
COPY notification-service/package.json ./package.json
RUN npm install
COPY notification-service/src ./src
COPY shared /shared
COPY contracts /contracts
EXPOSE 3004
CMD ["npm", "start"]
