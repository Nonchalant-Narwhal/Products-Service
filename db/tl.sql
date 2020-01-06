COPY products FROM '/data/csv/product.csv' CSV HEADER;
COPY related FROM '/data/csv/related.csv' CSV HEADER;
COPY features FROM '/data/csv/features.csv' CSV HEADER;
COPY styles FROM '/data/csv/styles.csv' CSV HEADER;
COPY skus FROM '/data/csv/skus.csv' CSV HEADER;

CREATE TEMPORARY TABLE tmp_table 
AS
SELECT * 
FROM photos
WITH NO DATA;


COPY tmp_table FROM '/data/csv/photos.csv' CSV HEADER;

INSERT INTO photos
SELECT *
FROM tmp_table
ON CONFLICT DO NOTHING;