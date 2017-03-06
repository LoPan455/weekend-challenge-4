CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
task_name VARCHAR(80) NOT NULL,
complete BOOLEAN NOT NULL DEFAULT 'FALSE'
);

INSERT INTO tasks (task_name)
VALUES
('clean car'),
('wash dog'),
('do dishes');

SELECT * 
FROM tasks;





