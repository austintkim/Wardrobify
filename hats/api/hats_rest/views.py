from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "import_href", "id"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style_name", "id"]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "hat_url",
        "location"
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST", "DELETE"])
def api_list_hats(request, location_vo_id):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        # Get the location object and put it in the content dict
        try:
            location_href = f"/api/locations/{location_vo_id}/"
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        try:
            hat = Hat.objects.get(id=location_vo_id)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
                )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            {"hat": hat},
            encoder=HatDetailEncoder,
            safe=False,
        )
    

