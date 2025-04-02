#!/bin/bash


while true; do

# Fetch the list of products
curl http://127.0.0.1:3042/products

# Loop through product IDs from 1 to 100
for i in {1..100}; do
  curl "http://127.0.0.1:3042/products/$i"
  sleep 1
done

sleep 2

done
