FROM node:20-alpine
WORKDIR /app
ENV NODE_PATH=/app/node_modules
COPY api-gateway/package.json ./package.json
RUN npm install
COPY api-gateway/src ./src
COPY shared /shared
COPY contracts /contracts
EXPOSE 3000
CMD ["npm", "start"]
