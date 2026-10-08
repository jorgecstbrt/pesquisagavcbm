FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY index.html server.js vite.config.js ./
RUN mkdir -p /app/data
ENV PORT=80
ENV DB_FILE=/app/data/voz-ativa.json
EXPOSE 80
CMD ["node", "server.js"]
