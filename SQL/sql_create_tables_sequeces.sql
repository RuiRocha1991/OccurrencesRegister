-- sequences
create sequence public.sq_occurrence_polygon
	increment 1
	minvalue 1
	maxvalue 9999999999999999
	start 1
	cache 1;

create sequence public.sq_occurrence_point
	increment 1
	minvalue 1
	maxvalue 9999999999999999
	start 1
	cache 1;


CREATE TABLE public.occurrences_point
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


CREATE TABLE public.occurrences_polygon
(
  id integer NOT NULL DEFAULT nextval('sq_occurrence_polygon'::regclass),
  name character varying(80),
  type integer,
  date timestamp,
  geometry geometry(Polygon,4326),
  CONSTRAINT key_occurrences_polygon PRIMARY KEY (id)
)


---- *************************************************************************------

INSERT INTO public.occurrences_point(
	 name, type, date, point)
	VALUES ( 'teste' ,1, statement_timestamp(),ST_SetSRID(ST_MakePoint(-8.806156,41.725398),4326));


INSERT INTO public.occurrences_polygon(
	 name, type, date, geometry)
	VALUES ('teste', 1, statement_timestamp(),
			ST_GeomFromText('POLYGON((-8.8467231 41.6939205 ,-8.842169 41.698922,-8.844864 41.700355, -8.848583 41.695555,-8.8467231 41.6939205))', 4326));
/****** ----------------------------- */

SELECT id, name, type, point, date
	FROM public.occurrences_point;

SELECT id, name, type, date, polygon
	FROM public.occurrences_polygon;



	codigo para filtrar no geoserver

	type like 1


types{
	Holes : 1,
	Lights: 2,
	DeadBodies:3,
	inundation:4,
	garbage:5,
}