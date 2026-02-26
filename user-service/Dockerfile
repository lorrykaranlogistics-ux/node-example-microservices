FROM node:20-alpine
WORKDIR /app
ENV NODE_PATH=/app/node_modules
COPY user-service/package.json ./package.json
RUN npm install
COPY user-service/src ./src
COPY shared /shared
EXPOSE 3001
CMD ["npm", "start"]
