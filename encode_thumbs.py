import base64
import json

with open("public/video-thumb.jpg", "rb") as f:
    v_b64 = base64.b64encode(f.read()).decode("utf-8")

with open("public/likes-thumb.jpg", "rb") as f:
    l_b64 = base64.b64encode(f.read()).decode("utf-8")

data = {
    "video": "data:image/jpeg;base64," + v_b64,
    "likes": "data:image/jpeg;base64," + l_b64
}

with open("thumbs.json", "w") as out:
    json.dump(data, out)

print("Saved thumbs.json successfully")
