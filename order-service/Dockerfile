FROM node:20-alpine
WORKDIR /app
ENV NODE_PATH=/app/node_modules
COPY order-service/package.json ./package.json
RUN npm install
COPY order-service/src ./src
COPY shared /shared
EXPOSE 3002
CMD ["npm", "start"]
