# Start your image with a node base image
FROM node:18-alpine AS build_image

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build \
    && rm -fr node_modules

# second stage
FROM node:18-alpine AS production_image
WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/
COPY package*.json ./
COPY vite.config.ts ./

RUN npm install typescript
RUN npm install -g vite

EXPOSE 8080
CMD [ "npm", "run", "preview" ]
# docker build -t boston-bioprocess-dashboard .
# docker run --rm -p 8080:8080 boston-bioprocess-dashboard
