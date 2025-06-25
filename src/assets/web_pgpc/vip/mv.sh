for file in lv*.png; do
  new_name=$(echo "$file" | sed -E 's/\.[a-f0-9]{8}\././')
  mv "$file" "$new_name"
done