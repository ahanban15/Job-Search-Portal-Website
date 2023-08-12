create table job(
	jobrole varchar(150) not null,
    jobcity varchar(150) not null,
    jobcompany varchar(150) not null,
    salary bigint
);

insert into job
values
("Intern", "Gwalior", "Teaching Hub", 10000);

select * from job;
    
