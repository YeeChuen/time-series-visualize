# Start your image with a node base image
FROM node:18-alpine AS build_frontend_image

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY ./frontend/package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./frontend .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build \
    && rm -fr node_modules

# second stage
FROM node:18-alpine AS production_frontend_image
WORKDIR /app

COPY --from=build_frontend_image /app/dist/ /app/dist/
COPY ./frontend/package*.json ./
COPY ./frontend/vite.config.ts ./

RUN npm install typescript
RUN npm install -g vite

# Finished frontend build
# EXPOSE 8080
# CMD [ "npm", "run", "preview" ]

# third stage backend build + full connection
FROM python:3.9 AS production_backend_image


WORKDIR /app

COPY --from=production_frontend_image /app/dist/ /app/frontend/dist/

RUN mkdir ./backend

COPY ./backend ./backend
RUN apt-get -q -y update 
RUN apt-get install -y gcc
RUN pip install -r ./backend/requirements.txt

ENV FLASK_ENV=production
ENV POSTGRESQL_SERVER=host.docker.internal
ENV POSTGRESQL_DATABASE=time_series_projects
ENV POSTGRESQL_PORT=5432
ENV POSTGRESQL_USER=postgres
ENV POSTGRESQL_PASSWORD=Postgresql98*

EXPOSE 5000
WORKDIR /app/backend
CMD ["gunicorn", "-b", ":5000", "app:app"]
# CMD ["gunicorn", "-b", ":5000", "wsgi:app"]
# docker build -t time-series-visualize-app .
# docker run --rm -p 5000:5000 time-series-visualize-app
