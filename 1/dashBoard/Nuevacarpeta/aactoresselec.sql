-- SQLite
-- select * from actor;
-- SQLite
select -- *,
count(a.first_name) as 'Grupo numero Rating',
count(f.rating) as 'Grupo numero Rating',
a.first_name,a.last_name,a.last_update
last_update,title,description,release_year,language_id,original_language_id,rental_duration,rental_rate,length,replacement_cost,rating,special_features
 from actor a  
inner join film_actor fa on fa.actor_id = a.actor_id
inner join film f ON f.film_id = fa.film_id
where a.actor_id = 2
GROUP by f.rating
;

/*
select * 
select count(*)
select distinct
select isnull()
select sum()
select max()
select min()
select max() and min()
select avg()
select max(),min() and avg 
concatenation
select case
select case an concatenarG
*queries
from
where
order by
group by
stored procedures
user defined function 

-----

Data type

Table Creation

Data Insertion

Truncate and drop statements

Dataset creation

Module introduction

Temporary Nature of SELECT Query Results

Retrieving data and select statement

Data Filetration 1

Data Filetration 2

Sorting Data

Update statement

Delete Statement

Transactions

Transaction In practice

Logical operators concepts

Logical Operators examples

Working with String Functions in SQL

Working with string functions example

Working with Date Functions in SQL

Working with Date Functions in SQL example

Working with Case Statements

Working with Case Statements example1

Working with Case Statements example2

Practice - Module4 01

Practice - Module4 02

Reviewing PK and FK concepts

Redundancy management in relational databases

Visual Overview of SQL Joins

SQL Joins Syntax

Inner Join

letf and right joins

Full join and an alternative method for inner join

Practice Module5 01

Practice Module5 02

Practice Module5 03

Aggregation functions

Using GROUP BY and HAVING to Analyze Data

Introduction of Module 7

Using Self Join in Practice

Using with clause CTEs

Using Subqueries for Advanced SQL Queries

Using Subqueries and the WITH Clause Together in a Complex UPDATE

Course Completed

*/
