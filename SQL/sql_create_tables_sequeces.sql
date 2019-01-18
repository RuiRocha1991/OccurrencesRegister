-- sequences
create sequence sq_occurrence_polygon
	increment 1
	minvalue 1
	maxvalue 9999999999999999
	start 1
	cache 1;

create sequence sq_occurrence_point
	increment 1
	minvalue 1
	maxvalue 9999999999999999
	start 1
	cache 1;


CREATE TABLE occurrences_point
(
    id numeric NOT NULL DEFAULT nextval('sq_occurrence_point'::regclass),
    name character varying(80),
    type numeric(2,0) NOT NULL,
	date timestamp,
    point geometry NOT NULL,
    CONSTRAINT occurrences_point_pkey PRIMARY KEY (id)
)
alter table occurrences_point 
alter COLUMN point type geometry(Point, 4326);


CREATE TABLE occurrences_polygon
(
  id integer NOT NULL DEFAULT nextval('sq_occurrence_polygon'::regclass),
  name character varying(80),
  type integer,
  date timestamp,
  geometry geometry(Polygon,4326),
  CONSTRAINT key_occurrences_polygon PRIMARY KEY (id)
)

alter table occurrences_line
alter COLUMN line type geometry(lineString, 4326);


---- *************************************************************************------

INSERT INTO occurrences_point(
	 name, type, date, point)
	VALUES ( 'teste' ,1, statement_timestamp(),ST_SetSRID(ST_MakePoint(-8.806156,41.725398),4326));

	

	INSERT INTO occurrences_point(
	 name, type, date, point)
	VALUES ( 'teste' ,2, statement_timestamp(),ST_SetSRID(ST_MakePoint(-8.847596 ,41.695263),4326));


INSERT INTO occurrences_polygon(
	 name, type, date, geometry)
	VALUES ('teste', 1, statement_timestamp(),
			ST_GeomFromText('POLYGON((-8.8467231 41.6939205 ,-8.842169 41.698922,-8.844864 41.700355, -8.848583 41.695555,-8.8467231 41.6939205))', 4326));

INSERT INTO occurrences_polygon(
	 name, type, date, geometry)
	VALUES ('teste', 2, statement_timestamp(),
			ST_GeomFromText('POLYGON((-8.847596 41.695263 ,-8.846706 41.695327,-8.844864 41.694878, -8.848583 41.695555,-8.846121 41.693953, -8.847596 41.695263))', 4326));


INSERT INTO public.occurrences_line(
	 name, type, data, line, image)
	VALUES ( 'primeira linha', 1, statement_timestamp(), ST_SetSRID(ST_MakeLine(ARRAY[ST_MakePoint(-8.847596 ,41.695263),ST_MakePoint(-8.806156,41.725398)]),4326), 'lixo');

/****** ----------------------------- */

SELECT id, name, type, point, date
	FROM occurrences_point;

SELECT id, name, type, date, polygon
	FROM occurrences_polygon;

select line.*, point.*, polygon.* from occurrences_line as line, occurrences_point as point, occurrences_polygon as polygon, regions
where ST_INTERSECTS(line.line, regions.geom) and ST_INTERSECTS(point.point, regions.geom) and ST_INTERSECTS(polygon.geometry, regions.geom) and regions.municipio='VIANA DO CASTELO';

	
/*
types{
	Holes : 1,
	Lights: 2,
	DeadBodies:3,
	inundation:4,
	garbage:5,
}*/