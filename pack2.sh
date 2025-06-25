#!/bin/bash

echo -e "\033[35m 打包开始 \033[0m"

yarn build

FILE=./dist/public/

if [ -d "$FILE" ]; then
    echo "$FILE is a directory"
	rm -rf $FILE
fi

mkdir -p $FILE'assets/js'


mv ./dist/assets/* ./dist/public/assets/
cp ./dist/assets/js/* ./dist/public/assets/js/


mv ./dist/*.html $FILE
cp ./iframe.html ./dist/index.html

rm -rf ./dist/assets
tar -zcvf dist.tar.gz ./dist
echo -e "\033[35m 打包结束 \033[0m"

cd ./dist
http-server

# echo -e "\033[30m 黑色字 \033[0m"
# echo -e "\033[31m 红色字 \033[0m"
# echo -e "\033[32m 绿色字 \033[0m"
# echo -e "\033[33m 黄色字 \033[0m"
# echo -e "\033[34m 蓝色字 \033[0m"
# echo -e "\033[35m 紫色字 \033[0m"
# echo -e "\033[36m 天蓝字 \033[0m"
# echo -e "\033[37m 白色字 \033[0m"


# DIST_FILE=~/Desktop/someall/projects/svns/发布目录/测试环境/dist
# if [ -d "$DIST_FILE" ]; then
#     echo "$DIST_FILE is a directory"
# 	rm -rf $DIST_FILE
# fi

# mkdir ~/Desktop/someall/projects/svns/发布目录/测试环境/dist


# cp -r ./dist/* ~/Desktop/someall/projects/svns/发布目录/测试环境/dist

# echo -e "\033[35m 拷贝成功 \033[0m"

# cd ~/Desktop/someall/projects/svns/发布目录

