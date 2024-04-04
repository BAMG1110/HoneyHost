-- Tabla para los usuarios
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Tabla para las sucursales
CREATE TABLE IF NOT EXISTS branch (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);

-- Tabla para los dispositivos
CREATE TABLE IF NOT EXISTS device (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  host TEXT UNIQUE NOT NULL,
  branch INTEGER NOT NULL,
  ip TEXT UNIQUE NOT NULL,
  device_type TEXT NOT NULL, 
  sistema_operativo TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  secret TEXT,
  FOREIGN KEY (branch) REFERENCES branch(id)
);