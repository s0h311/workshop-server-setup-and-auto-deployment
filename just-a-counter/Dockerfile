FROM node:24-alpine3.22

WORKDIR /app

RUN corepack enable

COPY package.json .
COPY pnpm-lock.yaml .
RUN yes | pnpm i

COPY . .

RUN pnpm build

# EXPOSE 5173

CMD ["node", "server.js"]