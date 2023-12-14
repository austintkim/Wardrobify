from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hat, LocationVO


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["import_href", "id", "closet_name", "shelf_number"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name", 
        "color",
        "hat_picture_url",
        "location",
        "id"
        ]
    
    encoders = {
        "location": LocationVODetailEncoder(),
    }


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "hat_picture_url",
        "location",
        "id"
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hat.objects.filter(location=location_vo_id)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
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


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_hat(request, pk):
    """
    Retrieve, update or delete a hat.
    """
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            {"hat": hat},
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            hat = Hat.objects.get(id=pk)
            hat.delete()
            return JsonResponse(
                hat,
                encoder=HatDetailEncoder,
                safe=False,
            )
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Hat does not exist"}, status=404)
    else:
        content = json.loads(request.body)
        try:
            if "location" in content:
                location_href = content["location"]
                location = LocationVO.objects.get(import_href=location_href)
                content["location"] = location
        except Hat.DoesNotExist:
            return JsonResponse({"message": "Hat does not exist"}, status=404)
        except LocationVO.DoesNotExist:
            return JsonResponse({"message": "Invalid location id"}, status=400)
        
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

