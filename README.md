# Boston Bioprocess Dashboard

Boston Bioprocess regularly runs fermentation tanks (think of a beer brewing process) to 
produce valuable bioproducts for our clients. Each fermentation run generates a time-series 
log of multiple process parameters that is analyzed by users. 

Boston Bioprocess Dashboard allow user to upload and visualize .csv datafile on a table and a graph.

## Using Boston Bioprocess Dashboard:
- there is only 3 pages
    - on the sider menu, there is `Data Upload`, `Data Table`, `Data Graph`
    - upload your csv file on `Data Upload`
        - limitation:
            - .csv extension
            - first row shows client name and client id in this format `<client_name>_<client_id>`
            - following row should contain following headers: time stamp, parameter, process value, units
            - following rows are the data corresponding to the headers
    - once upload complete, you can visualize the data in `Data Table` and `Data Graph`
    - `Data Table` and `Data Graph` have the following format:
        - click on the desired page to navigate
        - select client on the dropdown menu
        - data visualization correspond to selected client

# Web Server
- to be added

# Local Server (using Docker)
## Prerequisite:
- Docker https://www.docker.com/
- postgres https://www.postgresql.org/

## Installations & setups: 
1. cd to boston-bioprocess (git repo)

`cd .\boston-bioprocess`

2. replace ENV variable in `.\boston-bioprocess\Dockerfile`
```
ENV POSTGRESQL_SERVER=host.docker.internal
ENV POSTGRESQL_DATABASE=client_fermentation
ENV POSTGRESQL_PORT=5432
ENV POSTGRESQL_USER=postgres
ENV POSTGRESQL_PASSWORD=Postgresql98*
```

3. build docker (~6 min)

`docker build -t boston-bioprocess-app .`

4. OR you if you have set up Postgresql with ENV variables as shown above, you can simply pull from docker, this way build is not required.

`docker pull yeechuen/yct-bpp`

6. follow setup steps for [postgresql](#Database)


## Usage: Docker Local Server
1. run docker image

`docker run --rm -p 5000:5000 boston-bioprocess-app`

or (if you pulled)

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
### Backend:
1. cd to backend directory

`cd .\boston-bioprocess\backend`

2. create virtual environment

`python -m venv venv`

3. start python virtual environment

`.\venv\Scripts\activate`

- note: to deactivate: `deactivate`

4. install backend dependencies

`pip install -r requirements.txt`

### Frontend:

1. cd to frontend directory

`cd .\boston-bioprocess\frontend`

2. install frontend dependencies

`npm install`

### Database:

1. open psql terminal (SQL Shell)
    - window search "psql"
    - using SQL Shell, create database: client_fermentation

`CREATE DATABASE client_fermentation;`

2. create a `.env` file to your backend directory

`cd .\boston-bioprocess\backend`

3. create: `.env` add below into `.env`:
```
POSTGRESQL_SERVER = "localhost"
POSTGRESQL_DATABASE = "client_fermentation"
POSTGRESQL_PORT = "5432"
POSTGRESQL_USER = "postgres"
POSTGRESQL_PASSWORD = "<your password>*"  # on default Postgresql98*
```

- note: update each variable based on your setup.


## Usage: Manual Local Server
1. cd to backend directory

`cd .\boston-bioprocess\backend`

2. start virtual environment

`.\venv\Scripts\activate`

3. start backend server

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

`cd .\boston-bioprocess\frontend`

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

`cd .\boston-bioprocess\backend`

2. start virtual environment

`.\venv\Scripts\activate`

3. run testing

`coverage run -m pytest`

4. check coverage

`coverage report`
