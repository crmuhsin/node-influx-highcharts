#!/bin/bash
read -p "Please enter the time interval (in seconds): "  time
declare -i var=0
while true 
do
 python /home/user/oo/insert_influx.py
 ((var++))
 echo "Data Sent $var"
 sleep $time
done
