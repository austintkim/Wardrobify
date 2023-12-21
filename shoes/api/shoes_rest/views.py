from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoes, BinVO

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href", "id"]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["model_name", "id"]

class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "model_name",
        "manufacturer",
        "color",
        "picture_url",
        "bin"
    ]
    encoders = {
        "bin": BinVODetailEncoder()
    }


@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesDetailEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status = 400
            )

        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder = ShoesDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def show_shoes(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _=Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "bin" in content:
                bin_href = content["bin"]
                bin = BinVO.objects.get(import_href=bin_href)
                content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status = 400,
            )

        Shoes.objects.filter(id=pk).update(**content)
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False
        )
