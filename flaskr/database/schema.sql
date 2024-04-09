-- Drop and Create the User table
DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Drop and Create the Branch table
DROP TABLE IF EXISTS Branch;
CREATE TABLE IF NOT EXISTS Branch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- Drop and Create the Device table
DROP TABLE IF EXISTS Device;
CREATE TABLE IF NOT EXISTS Device (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hostname TEXT UNIQUE NOT NULL,
    branch_id INTEGER NOT NULL,
    ip TEXT UNIQUE NOT NULL,
    device_type TEXT NOT NULL,
    operating_system TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    secret TEXT,
    FOREIGN KEY (branch_id) REFERENCES Branch(id)
);

-- Drop and Create the UserBranchAccess junction table
DROP TABLE IF EXISTS UserBranchAccess;
CREATE TABLE IF NOT EXISTS UserBranchAccess (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    branch_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (branch_id) REFERENCES Branch(id)
);