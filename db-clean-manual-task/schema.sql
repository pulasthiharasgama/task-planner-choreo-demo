CREATE TABLE IF NOT EXISTS tasks
(
    ID int NOT NULL,
    DueDate DATE,
    ReminderText VARCHAR(255),
    ReminderDescription VARCHAR(1000),
    PRIMARY KEY (ID)
);