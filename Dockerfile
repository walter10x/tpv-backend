# Etapa de desarrollo (hot reload)
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add @nestjs/cli  # Añade esta línea
COPY . .
CMD ["yarn", "start:dev"]
# Etapa de build (compilación)
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Etapa de producción (imagen final, solo código compilado)
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main.js"]