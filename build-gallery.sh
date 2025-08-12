#!/bin/bash

# Path to your gallery folder (relative to this script)
GALLERY_DIR="./gallery"
OUTPUT_FILE="$GALLERY_DIR/gallery.js"

# Start the JS array
echo "window.GALLERY_IMAGES = [" > "$OUTPUT_FILE"

# Find images recursively, strip leading ./ and write paths
find "$GALLERY_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) \
| sort | while read -r file; do
  relpath="${file#./}"  # remove leading ./ for cleaner paths
  echo "  \"${relpath}\"," >> "$OUTPUT_FILE"
done

# End the array
echo "];" >> "$OUTPUT_FILE"

echo "✅ gallery.js updated with $(grep -c \"\\\"\" \"$OUTPUT_FILE\") images from $GALLERY_DIR and its subfolders."
