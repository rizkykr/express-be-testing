FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

RUN npm run build

HEALTHCHECK --interval=30s --timeout=5s CMD curl --fail http://localhost:3000/up || exit 1

CMD ["node", "src/index.js"]
