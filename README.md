# Time Series Visualize Dashboard

Time Series Visualize allow user to visualize projects run that generates a time-series 
log of multiple process parameters. 

Time Series Visualize Dashboard allow user to upload and visualize .csv datafile on a table and a graph.

here are some mock data for reference:
- [small data](https://github.com/YeeChuen/time-series-visualize/blob/main/mock-csv_001.csv)
- [large data](https://github.com/YeeChuen/time-series-visualize/blob/main/Project-1-data_002.csv)

## Using Time Series Visualize Dashboard:
- there is only 3 pages
    - on the sider menu, there is `Data Upload`, `Data Table`, `Data Graph`
    - upload your csv file on `Data Upload`
        - limitation:
            - .csv extension
            - file name contain project name and project id in this format `<project_name>_<project_id>.csv`
            - first row should contain following headers: time stamp, parameter, process value, units
            - following rows are the data corresponding to the headers
    - once upload complete, you can visualize the data in `Data Table` and `Data Graph`
    - `Data Table` and `Data Graph` have the following format:
        - click on the desired page to navigate
        - select project on the dropdown menu
        - data visualization correspond to selected project

# Web Server
- [Website](https://time-series-visualize.onrender.com/)

note: due to the web deployed on a free tier platform:
- it will takes some time to load the website
- once website is up,
    - wait couple minutes for the backend connection to establish (microservice, database)
    - first file upload will most likely fail, but wait a couple minutes, and try uploading it again.
    - if the second upload didn't work, it might've been uploaded, navigate to `Data Table` or `Data Graph` to see if uploaded project exists.
- large .csv file will likely fail, use this .csv example: `mock_csv.csv` (you can modify the values in the file and upload to see different data.)

# Local Server (using Docker)
## Prerequisite:
- Docker https://www.docker.com/
- postgres https://www.postgresql.org/

## Installations & setups: 
1. Pull from docker hub

`docker pull yeechuen/yc-tsv-app`

2. use following variable during setup steps for [postgresql](#Database)
```
POSTGRESQL SERVER = localhost
POSTGRESQL DATABASE = time_series_projects
POSTGRESQL PORT = 5432
POSTGRESQL USER = postgres
POSTGRESQL PASSWORD = Postgresql98*
```

## Usage: Docker Local Server
1. run docker image

`docker run --rm -p 5000:5000 yeechuen/yct-bpp`

2. open browser using following link:

`http://localhost:5000/`

# Local Server (manual)
## Prerequisite:
- IDE of your choice (recommends VSC) https://code.visualstudio.com/
- npm & node.js https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- python https://www.python.org/
- postgres https://www.postgresql.org/

## Installations & Setups:   
### Database:

1. open psql terminal (SQL Shell)
    - window search "psql"
    - using SQL Shell, create database: time_series_projects

`CREATE DATABASE time_series_projects;`

- note: update each variable based on your setup.

### Backend:
1. cd to backend directory

`cd .\time-series-visualize\backend`

2. create virtual environment

`python -m venv venv`

3. start python virtual environment

`.\venv\Scripts\activate`

- note: to deactivate: `deactivate`

4. install backend dependencies

`pip install -r requirements.txt`

5. create: `.env` add below into `.env`:
```
POSTGRESQL_SERVER = <your postgres server> (default "localhost")
POSTGRESQL_DATABASE = "time_series_projects"
POSTGRESQL_PORT = <your postgres port> (default "5432")
POSTGRESQL_USER = "<your postgres user>"
POSTGRESQL_PASSWORD = "<your postgres password>"
```

### Frontend:

1. cd to frontend directory

`cd .\time-series-visualize\frontend`

2. install frontend dependencies

`npm install`

3. create: `.env` add below into `.env`:
```
VITE_MICROSERVICE_BASE_URL = <your microservice url> (default "http://localhost:5000")
```

## Usage: Manual Local Server
1. cd to frontend directory

`cd .\time-series-visualize\frontend`

2. build frontend

`npm run build`

3. cd to backend directory

`cd .\time-series-visualize\backend`

4. start virtual environment

`.\venv\Scripts\activate`

5. start backend server

`flask run`

### Start database:
Postgresql DB should be on after finishing installation

### Port information:
expect servers to be live on following server:
- frontend port: 5173
- backend port: 5000
- database port: 5432

# Testing:
## Frontend testing:
1. cd to frontend directory

`cd .\time-series-visualize\frontend`

2. start frontend server

`npm run dev`

3. similarly, in another CLI tab start the testing server

`npx cypress open`

    - follow cypress prompt
    - it will ask for configuration when using for first time.
    - use `E2E Testing`
    - use `Chrome`
    - click `Start E2E Testing in Chrome`
    - click `Run 4 specs`

No coverage for current version

## Backend testing:
1. cd to backend directory

`cd .\time-series-visualize\backend`

2. start virtual environment

`.\venv\Scripts\activate`

3. run testing

`coverage run -m pytest`

4. check coverage

`coverage report`
