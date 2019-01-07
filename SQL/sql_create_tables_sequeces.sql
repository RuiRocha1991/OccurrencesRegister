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
    id numeric NOT NULL,
    name character(100) COLLATE pg_catalog."default" NOT NULL,
    type numeric(2,0) NOT NULL,
    point geometry NOT NULL,
    CONSTRAINT occurrences_point_pkey PRIMARY KEY (id)
)
alter table occurrences_point 
alter COLUMN point type geometry(Point, 4326);


CREATE TABLE public.occurrences_polygon
(
    id numeric NOT NULL,
    name character(100) COLLATE pg_catalog."default" NOT NULL,
    type numeric(2,0) NOT NULL,
    polygon geometry NOT NULL,
    CONSTRAINT occurrences_polygon_pkey PRIMARY KEY (id)
)

---- *************************************************************************------

INSERT INTO public.occurrences_point(
	id, name, type, date, point)
	VALUES (nextval('sq_occurrence_point'), 'teste' ,1, statement_timestamp(),ST_SetSRID(ST_MakePoint(-8.806156,41.725398),4326));


INSERT INTO public.occurrences_polygon(
	id, name, type, date, polygon)
	VALUES (nextval('sq_occurrence_polygon'),'teste', 1, statement_timestamp(),
			ST_GeomFromText('MULTIPOLYGON(((-8.8467231 41.6939205 ,-8.842169 41.698922,-8.844864 41.700355, -8.848583 41.695555,-8.8467231 41.6939205)))', 4326));
/****** ----------------------------- */

SELECT id, name, type, point, date
	FROM public.occurrences_point;

SELECT id, name, type, date, polygon
	FROM public.occurrences_polygon;

