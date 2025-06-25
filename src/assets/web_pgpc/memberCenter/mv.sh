for file in $(ls); do
  new_name=$(echo "$file" | sed -E 's/\.[a-f0-9]{8}\././')
  mv "$file" "$new_name"
done
# for file in lv*.png; do
#   new_name=$(echo "$file" | sed -E 's/\.[a-f0-9]{8}\././')
#   # mv "$file" "$new_name"
#   echo "$new_name"
# done


# 刪除包含(1)的檔案名稱: `find . -maxdepth 1 -type f -name "*\(1\)*" -exec rm {} +`
# 刪除包含(2)的檔案名稱: `find . -maxdepth 1 -type f -name "*\(2\)*" -exec rm {} +`