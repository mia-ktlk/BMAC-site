#!/usr/bin/env bash
# Resize team photos to 600×600 (2× max card size) and export WebP to team/.
#
# Add or replace source files here (not in team/ — that folder is WebP output only):
#   client/public/images/team-src/
# Then run: pnpm run optimize:team-images
#
# Naming: vidisha.png, vidisha-hover.png, anna.png, anna-hover.png, etc.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT/client/public/images/team-src"
OUT_DIR="$ROOT/client/public/images/team"
MAX=600
QUALITY=82

mkdir -p "$SRC_DIR" "$OUT_DIR"

shopt -s nullglob
sources=("$SRC_DIR"/*.{png,jpg,jpeg,PNG,JPG,JPEG})
# Also accept sources dropped directly in team/ (legacy)
sources+=("$OUT_DIR"/*.{png,jpg,jpeg,PNG,JPG,JPEG})

if ((${#sources[@]} == 0)); then
  webps=("$OUT_DIR"/*.webp)
  echo "Nothing to optimize."
  echo ""
  echo "  Sources:  $SRC_DIR/"
  echo "  Output:   $OUT_DIR/"
  echo ""
  if ((${#webps[@]} > 0)); then
    echo "Team images are already WebP:"
    ls -lh "${webps[@]}"
    echo ""
    echo "To update a photo, add PNG/JPEG to team-src/ and run this script again."
  else
    echo "No WebP files yet. Add PNG/JPEG sources to team-src/ first."
  fi
  exit 0
fi

for src in "${sources[@]}"; do
  stem="$(basename "$src")"
  stem="${stem%.*}"
  tmp="$OUT_DIR/.tmp-$stem.png"
  out="$OUT_DIR/$stem.webp"

  echo "Optimizing $stem …"
  sips -z "$MAX" "$MAX" "$src" --out "$tmp" >/dev/null
  cwebp -q "$QUALITY" -m 6 "$tmp" -o "$out"
  rm -f "$tmp" "$src"
done

echo ""
echo "Done. WebP files:"
ls -lh "$OUT_DIR"/*.webp
