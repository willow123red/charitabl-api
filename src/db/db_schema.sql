CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE charities (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  short_description VARCHAR(255) NOT NULL,
  long_description TEXT,
  qr_img_url VARCHAR(255),
  logo VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  charity_id INTEGER REFERENCES charities(id)
);

CREATE TABLE donations (
  id SERIAL PRIMARY KEY NOT NULL,
  amount_cents INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id),
  charity_id INTEGER REFERENCES charities(id),
  employee_id INTEGER REFERENCES employees(id),
  donated_at TIMESTAMP NOT NULL DEFAULT NOW()
);