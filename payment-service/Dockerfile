FROM node:20-alpine
WORKDIR /app
ENV NODE_PATH=/app/node_modules
COPY payment-service/package.json ./package.json
RUN npm install
COPY payment-service/src ./src
COPY shared /shared
EXPOSE 3003
CMD ["npm", "start"]
