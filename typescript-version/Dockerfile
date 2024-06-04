# 使用 node:18-alpine 作为构建基础镜像
FROM node:18-alpine 
WORKDIR /app

# 复制 package.json 和 package-lock.json 或 yarn.lock
COPY package.json package-lock.json* ./

# 复制整个项目文件，确保所有必需文件都在安装依赖前被复制
COPY . .

# 如果有 .env 文件，确保它也被复制到 Docker 容器中
COPY .env ./

# 安装依赖
RUN npm install

# 构建应用
RUN npm run build

# 暴露 3000 端口
EXPOSE 3000

# 启动应用
CMD ["sh", "-c", "echo $NEXTAUTH_SECRET && node_modules/.bin/next start"]

# --------------------



# 使用 node:18-alpine 作为运行时基础镜像
# FROM node:18-alpine
# WORKDIR /app



# # 复制配置文件、公共资源和构建输出
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules

# # 暴露 3000 端口
# EXPOSE 3000

# # 启动应用
# CMD ["sh", "-c", "echo $NEXTAUTH_SECRET && node_modules/.bin/next start"]
