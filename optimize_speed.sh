#!/bin/bash

# Remove globe.gl from all files
for file in index.html register.html procedure.html learn.html; do
    sed -i '' '/<script src="https:\/\/unpkg.com\/globe.gl"><\/script>/d' "$file"
    sed -i '' '/<!-- Globe.gl -->/d' "$file"
done

# Add globe.gl with defer ONLY to index.html (in head)
sed -i '' 's/<\/head>/    <!-- Globe.gl (Deferred for speed) -->\n    <script src="https:\/\/unpkg.com\/globe.gl" defer><\/script>\n<\/head>/' index.html

# Add defer to script.js in all files
for file in index.html register.html procedure.html learn.html; do
    sed -i '' 's/<script src="script.js"><\/script>/<script src="script.js" defer><\/script>/' "$file"
done

