#!/bin/sh

count=1

while [ $count -le 90 ]
do
	echo "value of count $count"
	count=$(($count+1))
	sleep 1
done



