from PIL import Image, ImageDraw, ImageFont
import os

images_dir = "public/images/wave-watch"
files = {
    "weather-screen.png": {"text": "Weather • 1 Finger", "fingers": [1, 0, 0, 0]},
    "heartrate-screen.png": {"text": "Heart Rate • 2 Fingers", "fingers": [1, 1, 0, 0]},
    "music-screen.png": {"text": "Music • 3 Fingers", "fingers": [1, 1, 1, 0]},
    "notifications-screen.png": {"text": "Notifications • 4 Fingers", "fingers": [1, 1, 1, 1]},
    "call-screen.png": {"text": "Incoming Call • Thumb Gestures", "fingers": "thumb"}
}

width = 1024
height = int(1024 * (0.34 / 0.28)) # 1243
bottom_h = height - 1024 # 219

try:
    font = ImageFont.truetype("segoeui.ttf", 28)
    font_bold = ImageFont.truetype("segoeuib.ttf", 36)
except:
    try:
        font = ImageFont.truetype("arial.ttf", 28)
        font_bold = ImageFont.truetype("arialbd.ttf", 36)
    except:
        font = ImageFont.load_default()
        font_bold = font

for filename, data in files.items():
    filepath = os.path.join(images_dir, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}")
        continue
    
    img = Image.open(filepath).convert("RGBA")
    
    out = Image.new("RGBA", (width, height), (5, 5, 5, 255))
    
    mask = Image.new("L", (1024, 1024), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((2, 2, 1021, 1021), fill=255)
    
    out.paste(img, (0, 0), mask)
    
    draw = ImageDraw.Draw(out)
    
    text = data["text"]
    text_bbox = draw.textbbox((0, 0), text, font=font_bold)
    text_w = text_bbox[2] - text_bbox[0]
    draw.text(((width - text_w) / 2, 1024 + 40), text, font=font_bold, fill=(220, 220, 220, 255))
    
    center_y = 1024 + 130
    center_x = width // 2
    
    if data["fingers"] != "thumb":
        fw = 18
        fh_up = 65
        fh_down = 25
        spacing = 35
        start_x = center_x - (spacing * 1.5)
        
        # thumb tucked
        thumb_x = start_x - spacing - 15
        draw.rounded_rectangle((thumb_x - fw/2, center_y + fh_up/2 - fh_down, thumb_x + fw/2, center_y + fh_up/2), radius=fw/2, fill=(60, 60, 60, 255))
        
        for i, f in enumerate(data["fingers"]):
            x = start_x + i * spacing
            if f == 1:
                draw.rounded_rectangle((x - fw/2, center_y - fh_up/2, x + fw/2, center_y + fh_up/2), radius=fw/2, fill=(51, 153, 255, 255))
            else:
                draw.rounded_rectangle((x - fw/2, center_y + fh_up/2 - fh_down, x + fw/2, center_y + fh_up/2), radius=fw/2, fill=(60, 60, 60, 255))
    else:
        fw = 18
        fh_up = 65
        fh_down = 25
        spacing = 35
        
        # Accept
        lx = center_x - 180
        for i in range(4):
            x = lx + i * spacing
            draw.rounded_rectangle((x - fw/2, center_y + fh_up/2 - fh_down, x + fw/2, center_y + fh_up/2), radius=fw/2, fill=(60, 60, 60, 255))
        thumb_x = lx - spacing
        draw.rounded_rectangle((thumb_x - fw/2, center_y - fh_up/2, thumb_x + fw/2, center_y + fh_up/2 - 10), radius=fw/2, fill=(34, 204, 102, 255))
        
        t1 = "Accept"
        t1_bbox = draw.textbbox((0, 0), t1, font=font)
        draw.text((lx + spacing*1.5 - (t1_bbox[2]-t1_bbox[0])/2, center_y - 20), t1, font=font, fill=(34, 204, 102, 255))

        # Reject
        rx = center_x + 60
        for i in range(4):
            x = rx + i * spacing
            draw.rounded_rectangle((x - fw/2, center_y - fh_up/2, x + fw/2, center_y - fh_up/2 + fh_down), radius=fw/2, fill=(60, 60, 60, 255))
        thumb_x = rx - spacing
        draw.rounded_rectangle((thumb_x - fw/2, center_y - fh_up/2 + 10, thumb_x + fw/2, center_y + fh_up/2), radius=fw/2, fill=(204, 34, 34, 255))
        
        t2 = "Reject"
        t2_bbox = draw.textbbox((0, 0), t2, font=font)
        draw.text((rx + spacing*1.5 - (t2_bbox[2]-t2_bbox[0])/2, center_y - 20), t2, font=font, fill=(204, 34, 34, 255))

    out.save(filepath)
    print(f"Processed {filename}")
