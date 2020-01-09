DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS related CASCADE;
DROP TABLE IF EXISTS features CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS skus CASCADE;

CREATE TABLE products(
  id serial PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description text,
  category VARCHAR(255),
  default_price float
);

CREATE TABLE related(
  id serial PRIMARY KEY,
  current_product_id INT REFERENCES products (id),
  related_product_id INT 
);

CREATE TABLE features(
  id serial PRIMARY KEY,
  product_id INT REFERENCES products(id),
  feature VARCHAR(255),
  value VARCHAR(255)
);

CREATE TABLE styles(
  id serial PRIMARY KEY,
  product_id INT REFERENCES products (id),
  name VARCHAR(255),
  sale_price VARCHAR(255),
  original_price FLOAT,
  default_style INT
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
  url text,
  thumbnail_url text
);

CREATE INDEX product_index ON products (id);
CREATE INDEX related_index ON related (current_product_id);
CREATE INDEX features_index ON features (product_id);
CREATE INDEX styles_index ON styles (product_id);
CREATE INDEX skus_index ON skus (style_id);
CREATE INDEX photos_index ON photos (style_id);