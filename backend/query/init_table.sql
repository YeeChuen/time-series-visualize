CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS run_clients (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    run_id VARCHAR(20) PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS run_time_series (
    id UUID UNIQUE DEFAULT uuid_generate_v4(),
    run_id VARCHAR(20),
    time_stamp FLOAT NOT NULL,
    parameter VARCHAR(255) NOT NULL,
    process_value FLOAT NOT NULL,
    units VARCHAR(50),
    PRIMARY KEY (run_id, time_stamp, parameter),
    FOREIGN KEY (run_id) REFERENCES run_clients(run_id) ON DELETE CASCADE
);
