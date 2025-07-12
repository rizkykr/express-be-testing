# 1. Base image: gunakan versi LTS Node.js terbaru sesuai kebutuhanmu
FROM node:20-alpine

# 2. Setup working directory
WORKDIR /usr/src/app

# 3. Copy package.json + lock dan install dependencies
COPY package*.json ./
RUN npm ci --only=production

# 4. Copy seluruh source code
COPY . .

# 5. Expose port aplikasi
EXPOSE 3000

# 6. Tentukan environment default (boleh diubah runtime)
ENV NODE_ENV=production

# 7. Jika butuh build step (misal TS / bundler)
# RUN npm run build

# 8. Healthcheck (opsional, tapi recommended)
HEALTHCHECK --interval=30s --timeout=5s CMD curl --fail http://localhost:3000/up || exit 1

# 9. Start command
CMD ["node", "index.js"]
