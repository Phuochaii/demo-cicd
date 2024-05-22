FROM node:latest AS base
RUN npm install -g pnpm

# development stage
FROM base AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm test:cov
RUN pnpm run build 

# production stage
FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN pnpm install --only=prod
COPY --from=development /usr/src/app/dist ./dist

ENV APP_MAIN_FILE=dist/main
CMD node ${APP_MAIN_FILE}