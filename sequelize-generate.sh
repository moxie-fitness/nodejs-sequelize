#!/bin/bash
# Delete the old models & migrations
#rm ./models/*
rm ./migrations/*

# Generate the migrations
sequelize migration:generate --name user --attributes id:integer,name:string,email:string,password:string,deleted_at:date
## GENERATE MODELS FROM DB
# make sure local db from laradock is running
#run: sequelize-auto -o "./models" -d default -h localhost -u default -p 3306 -x secret -e mysql
