# Boston Bioprocess Dashboard

Boston Bioprocess regularly runs fermentation tanks (think of a beer brewing process) to 
produce valuable bioproducts for our clients. Each fermentation run generates a time-series 
log of multiple process parameters that is analyzed by users. 

Boston Bioprocess Dashboard allow user to upload and visualize .csv datafile on a table and a graph.

## Using Boston Bioprocess dashboard:
- there is only 3 pages
    - on the sider menu, there is `Data Upload`, `Data Table`, `Data Graph`
                - upload your csv file on `Data Upload`
                    - limitation:
                        - .csv extension
                        - first row shows client name and client id in this format
                            <client_name>_<client_id>
                        - following row should contain following headers
                            time stamp, parameter, process value, units
                        - following rows are the data corresponding to the headers
                - once upload complete, you can visualize the data in `Data Table` and `Data Graph`
                - `Data Table` and `Data Graph` have the following format:
                    - click on the desired page to navigate
                    - select client on the dropdown menu
                    - data visualization correspond to selected client

            - web server:
                - to be added

            - pre-requisites:
                - IDE of your choice (recommends VSC)
                    https://code.visualstudio.com/
                - npm & node.js
                    https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
                - python
                    https://www.python.org/
                - postgres
                    https://www.postgresql.org/

            - installations & setups:   
                - python:
                    - cd to backend directory
                        `cd .\boston-bioprocess\backend`
                    - create virtual environment
                        `python -m venv venv`
                    - start python virtual environment
                        `.\venv\Scripts\activate`
                        - note: to deactivate:
                            `deactivate`
                    - install backend dependencies
                        - pip install -r requirements.txt

                - frontend:
                    - cd to frontend directory
                        `cd .\boston-bioprocess\frontend`
                    - install frontend dependencies
                        `npm install`

                - database:
                    - open psql terminal (SQL Shell)
                        - window search "psql"
                    - using SQL Shell, create database: client_fermentation
                        `CREATE DATABASE client_fermentation;`
                    - create a `.env` file to your backend directory
                        `cd .\boston-bioprocess\backend`
                        create: `.env`
                        - add below into `.env`:
                            ```
                            POSTGRESQL_SERVER = "localhost"
                            POSTGRESQL_DATABASE = "client_fermentation"
                            POSTGRESQL_PORT = "5432"
                            POSTGRESQL_USER = "postgres"
                            POSTGRESQL_PASSWORD = "<your password>*" 
                            ```
                        - note: update each variable based on your setup.

            - usage:
                - start frontend: 
                    - cd to frontend directory
                        `cd .\boston-bioprocess\frontend`
                    - start frontend server
                        `npm run dev`

                - start backend: 
                    - cd to backend directory
                        `cd .\boston-bioprocess\backend`
                    - start virtual environment
                        `.\venv\Scripts\activate`
                    - start backend server
                        `flask run`

                - start database:
                    - Postgresql DB should be on after finishing installation

                - port information:
                    - frontend port: 5173
                    - backend port: 5000
                    - database port: 5432

            - testing:
                - frontend testing:
                    - start the frontend server
                        - cd to frontend directory
                            `cd .\boston-bioprocess\frontend`
                        - start frontend server
                            `npm run dev`
                    - start the testing server
                        - cd to frontend directory
                            `cd .\boston-bioprocess\frontend`
                        - start frontend server
                            `npx cypress open`
                        - follow cypress prompt
                            - it will ask for configuration when using for first time.
                            - use `E2E Testing`
                            - use `Chrome`
                            - click `Start E2E Testing in Chrome`
                            - click `Run 4 specs`
                        - No coverage for current version

                - backend testing:
                    - cd to backend directory
                        `cd .\boston-bioprocess\backend`
                    - start virtual environment
                        `.\venv\Scripts\activate`
                    - run testing
                        `coverage run -m pytest`
                    - check coverage
                        `coverage report`
