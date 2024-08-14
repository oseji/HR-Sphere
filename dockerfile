FROM node:20-alpine

WORKDIR /app

# COPY PACKAGE FILES
COPY package.json package-lock.json ./

COPY index.html .

# INSTALL DEPENDENCIES FROM PACKAGE.JSON
RUN npm install

# COPY CONFIGURATION FILES
COPY postcss.config.js tailwind.config.js tsconfig.json tsconfig.node.json vite.config.ts ./

COPY ./public ./public

COPY ./src ./src

# EXECUTE BUILD COMMAND
RUN npm run build

EXPOSE 3000

CMD [ "npm","run","preview" ]