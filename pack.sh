#!/bin/bash

echo -e "\033[35m 打包开始 \033[0m"

yarn build

FILE=./web_new

if [ -d "$FILE" ]; then
    echo "$FILE is a directory"
	rm -rf $FILE
fi

mkdir -p $FILE'/assets/js'

cp -r ./dist/assets/* $FILE/assets/
cp -r ./dist/assets/js/* $FILE/assets/js/


cp -r ./dist/* $FILE

tar -zcvf web_new.tar.gz ./web_new
echo -e "\033[35m 打包结束 \033[0m"

cd ./web_new
http-server



