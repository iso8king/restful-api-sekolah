FROM node:18

WORKDIR /app

# Salin package.json dan prisma schema dulu
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Salin semua file proyek
COPY . .

EXPOSE 3980

CMD ["npm", "start"]
