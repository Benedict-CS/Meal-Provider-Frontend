FROM node:18-alpine 
WORKDIR /app

COPY package.json package-lock.json* ./
COPY . .
COPY .env ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "echo $NEXTAUTH_SECRET && node_modules/.bin/next start"]


# --------------------

# FROM node:18-alpine
# WORKDIR /app

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules

# EXPOSE 3000

# CMD ["sh", "-c", "echo $NEXTAUTH_SECRET && node_modules/.bin/next start"]
