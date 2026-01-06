FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app files
COPY . .

EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start:dev"]

