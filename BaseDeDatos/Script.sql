Use monitoreo_db;

CREATE TABLE processes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    porcentaje FLOAT NOT NULL,
    pid INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    user INT NOT NULL,
    state INT NOT NULL,
    ram FLOAT NOT NULL,
    father INT
);


CREATE TABLE cpus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    _usage FLOAT NOT NULL
);


CREATE TABLE cpu_processes (
    cpu_id INT REFERENCES cpus(id),
    process_id INT REFERENCES processes(id),
    PRIMARY KEY (cpu_id, process_id)
);


CREATE TABLE rams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_ram FLOAT NOT NULL,
    free_ram FLOAT NOT NULL,
    used_ram FLOAT NOT NULL,
    percentage_used FLOAT NOT NULL
);

CREATE TABLE ips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(15) NOT NULL
);
