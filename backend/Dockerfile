FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache wget

COPY package.json package-lock.json* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main.js"]
