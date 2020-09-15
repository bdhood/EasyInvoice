CREATE TABLE public.users (
    id serial NOT NULL,
	"name" varchar NOT NULL,
    email varchar NOT NULL,
	"address" varchar NULL,
	phone varchar NULL,
	company_name varchar NULL,
	company_address varchar NULL,
	password_hash varchar NOT NULL
);

CREATE TABLE public.items (
	id serial NOT NULL,
	"date" date NOT NULL,
	"description" varchar NULL,
	quanity int4 NULL,
	unit_price int4 NULL,
    user_id int NOT NULL
);