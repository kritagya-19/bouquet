import math
from PIL import Image, ImageDraw, ImageFilter

# Create a high-res scalloped eyelet lace card
# Target: 1200 x 860 px for ultra sharpness on Retina / 4K displays
W, H = 1200, 860
img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Colors
lace_color = (252, 246, 237, 255)       # warm cream ivory
lace_shadow = (240, 228, 212, 255)      # subtle inner shading
inner_bg = (255, 253, 249, 255)         # pure smooth stationery paper
stitch_color = (132, 27, 45, 120)       # subtle wine-tinted stitch dots

# Dimensions
margin = 40
inner_w = W - 2 * margin
inner_h = H - 2 * margin

# 1. Base smooth cream card
card_rect = [margin, margin, W - margin, H - margin]
draw.rounded_rectangle(card_rect, radius=24, fill=lace_color)

# 2. Add scallops along perimeter
scallop_r = 18
step = 26

# Top and Bottom edges
for x in range(margin + 20, W - margin - 20, step):
    # Top scallops
    draw.ellipse([x - scallop_r, margin - scallop_r + 6, x + scallop_r, margin + scallop_r - 6], fill=lace_color)
    # Eyelet hole in top scallop
    draw.ellipse([x - 5, margin - 3, x + 5, margin + 7], fill=(0, 0, 0, 0))
    # Small satellite holes
    draw.ellipse([x - 10, margin + 6, x - 7, margin + 9], fill=(0, 0, 0, 0))
    draw.ellipse([x + 7, margin + 6, x + 10, margin + 9], fill=(0, 0, 0, 0))

    # Bottom scallops
    draw.ellipse([x - scallop_r, H - margin - scallop_r + 6, x + scallop_r, H - margin + scallop_r - 6], fill=lace_color)
    # Eyelet hole in bottom scallop
    draw.ellipse([x - 5, H - margin - 7, x + 5, H - margin + 3], fill=(0, 0, 0, 0))
    draw.ellipse([x - 10, H - margin - 10, x - 7, H - margin - 7], fill=(0, 0, 0, 0))
    draw.ellipse([x + 7, H - margin - 10, x + 10, H - margin - 7], fill=(0, 0, 0, 0))

# Left and Right edges
for y in range(margin + 20, H - margin - 20, step):
    # Left scallops
    draw.ellipse([margin - scallop_r + 6, y - scallop_r, margin + scallop_r - 6, y + scallop_r], fill=lace_color)
    draw.ellipse([margin - 3, y - 5, margin + 7, y + 5], fill=(0, 0, 0, 0))
    draw.ellipse([margin + 6, y - 10, margin + 9, y - 7], fill=(0, 0, 0, 0))
    draw.ellipse([margin + 6, y + 7, margin + 9, y + 10], fill=(0, 0, 0, 0))

    # Right scallops
    draw.ellipse([W - margin - scallop_r + 6, y - scallop_r, W - margin + scallop_r - 6, y + scallop_r], fill=lace_color)
    draw.ellipse([W - margin - 7, y - 5, W - margin + 3, y + 5], fill=(0, 0, 0, 0))
    draw.ellipse([W - margin - 10, y - 10, W - margin - 7, y - 7], fill=(0, 0, 0, 0))
    draw.ellipse([W - margin - 10, y + 7, W - margin - 7, y + 10], fill=(0, 0, 0, 0))

# Inner stationery area
inner_margin = margin + 30
inner_rect = [inner_margin, inner_margin, W - inner_margin, H - inner_margin]
draw.rounded_rectangle(inner_rect, radius=16, fill=inner_bg)

# Dotted stitching border around inner stationery
for x in range(inner_margin + 6, W - inner_margin - 6, 12):
    draw.ellipse([x - 2, inner_margin - 8, x + 2, inner_margin - 4], fill=stitch_color)
    draw.ellipse([x - 2, H - inner_margin + 4, x + 2, H - inner_margin + 8], fill=stitch_color)

for y in range(inner_margin + 6, H - inner_margin - 6, 12):
    draw.ellipse([inner_margin - 8, y - 2, inner_margin - 4, y + 2], fill=stitch_color)
    draw.ellipse([W - inner_margin + 4, y - 2, W - inner_margin + 8, y + 2], fill=stitch_color)

# Save lace card background
img.save('public/letter-assets/lace_stationery.png')
print('Lace stationery created successfully!')
