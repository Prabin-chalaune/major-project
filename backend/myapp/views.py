import torch
import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import RoomInterior
from .serializer import InterriorSerializer

from .generator import Generator
from .utils import generate_designs

# select device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# load generator model
generator = Generator(256, 5).to(device)

# to load pretrained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "gen_400.pth")
model = torch.load(MODEL_PATH, map_location=device)
generator.load_state_dict(model)

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@method_decorator(csrf_exempt, name="dispatch")
class MlmodelView(APIView):
    def get(self, request):
        return Response(
            {"message": "use POST method to generate Interior"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    def post(self, request):
        room_type = request.data.get("room_type")

        if room_type not in [
            "bed",
            "bath",
            "dining",
            "kitchen",
            "living",
        ]:
            return Response(
                {"error": f"{room_type} is not present"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # generate img
            generated_img_url = generate_designs(room_type)
            # save to db
            room = RoomInterior.objects.create(
                room_type=room_type, room_image_url=generated_img_url
            )

            serializer = InterriorSerializer(room)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
