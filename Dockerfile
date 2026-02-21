FROM node:18-alpine

WORKDIR /usr/src/app

# Install production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --only=production

# Copy source
COPY . .

ENV NODE_ENV=production

CMD ["node", "main.js"]
