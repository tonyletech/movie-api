FROM node:22-slim

# Install dependencies to build native modules like sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only package files and install cleanly inside container
COPY package*.json ./
RUN npm install

# Copy rest of source code
COPY . .

# Build TS to JS
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]
