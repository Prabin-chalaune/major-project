import torch
import torchvision
import os

# to give every images unique filename
import uuid

from django.conf import settings

from .generator import Generator

# select device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# load generator model
generator = Generator(256, 5).to(device)

# to load pretrained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "gen_400.pth")
model = torch.load(MODEL_PATH, map_location=device)
generator.load_state_dict(model)


def generate_designs(room_type):
    if room_type == "bed":
        lbl = torch.full((32,), 1).to(device)
    elif room_type == "bath":
        lbl = torch.full((32,), 0).to(device)
    elif room_type == "dining":
        lbl = torch.full((32,), 2).to(device)
    elif room_type == "kitchen":
        lbl = torch.full((32,), 3).to(device)
    elif room_type == "living":
        lbl = torch.full((32,), 4).to(device)

    generator.eval()
    # Generate random noise
    noise = torch.randn(32, 256).to(device)
    # Generate image
    with torch.no_grad():
        generated_image = generator(noise, lbl)

        # Generate a unique filename
    new_img_filename = f"{room_type}_room_{uuid.uuid4().hex}.jpg"

    # Save generated image
    image_path = os.path.join(settings.MEDIA_ROOT, "generated_images", new_img_filename)
    os.makedirs(os.path.dirname(image_path), exist_ok=True)
    torchvision.utils.save_image(
        generated_image[0],
        image_path,
        normalize=True,
    )

    return f"/media/generated_images/{new_img_filename}"
