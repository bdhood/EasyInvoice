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

INSERT INTO users (email, "name", phone, "address", company_name, company_address, password_hash) VALUES 
('test@test.com', 'Test Account', '+1 (123) 345-5678', '61324 A Street\nHayward, CA\n94541', 'Employer Name', '65814 B St\nSan Francisco, CA\n95112', 'c5c529f0e67605b84fae118b6ca22c87b65a747eb0581050571261b1f1e1cb0d'),
('user@test.com', 'User Account', '+1 (123) 345-5678', '61324 A Street\nHayward, CA\n94541', 'Employer Name', '65814 B St\nSan Francisco, CA\n95112', '14da879c1efd87bb30ee8109681aabdd19a5eb9a34399d22fdfc0bf787c76759');

INSERT INTO public.items ("date",description,quanity,unit_price,user_id) VALUES 
('2020-09-08','Manual Regression',4,30,1)
,('2020-09-14','Automation',6,45,1)
,('2020-09-09','Exploratory',4,37,1)
,('2020-09-09','Test planning',7,50,1)
,('2020-09-14','Production Deploy',2,40,1)
,('2020-09-08','Manual Regression',4,30,2)
,('2020-09-14','Automation',6,45,2)
,('2020-09-09','Exploratory',4,37,2)
,('2020-09-09','Test planning',7,50,2)
,('2020-09-14','Production Deploy',2,40,2);