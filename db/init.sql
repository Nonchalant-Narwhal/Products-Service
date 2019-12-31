DROP TABLE products CASCADE;
DROP TABLE related CASCADE;
DROP TABLE features CASCADE;
DROP TABLE styles CASCADE;
DROP TABLE photos CASCADE;
DROP TABLE skus CASCADE;

CREATE TABLE products(
  id serial PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  default_price float
);

CREATE TABLE related(
  id serial PRIMARY KEY,
  current_product_id INT REFERENCES products (id),
  related_product_id INT REFERENCES products (id)
);

CREATE TABLE features(
  id serial PRIMARY KEY,
  product_id INT REFERENCES products( id),
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE styles(
  id serial PRIMARY KEY,
  product_id INT REFERENCES products (id),
  name VARCHAR(255),
  original_price FLOAT,
  sale_price FLOAT,
  _default INT
);

CREATE TABLE skus(
  id serial PRIMARY KEY,
  style_id INT REFERENCES styles (id),
  size VARCHAR(255),
  quantity INT
);

CREATE TABLE photos(
  id serial PRIMARY KEY,
  style_id INT REFERENCES styles (id),
  thumbnail_url VARCHAR(255),
  url VARCHAR(255)
);