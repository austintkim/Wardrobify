
import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()
# Import models from hats_rest, here.
# from hats_rest.models import Something
# adsfasdfasfaf
from hats_rest.models import LocationVO


def get_locations():
    url = "http://wardrobe-api:8000/api/locations/"
    response = requests.get(url)
    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            import_href=location["href"],
            defaults={"closet_name": location["closet_name"]},
        )


def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_conferences()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()




# import django
# import os
# import sys
# import time
# import json
# import requests

# sys.path.append("")
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
# django.setup()
# # Import models from hats_rest, here.
# # from hats_rest.models import Something
# # adsfasdfasfaf
# from hats_rest.models import LocationVO


# def get_locations():
#     response = requests.get("http://wardrobe-api:8000/api/locations/")
#     content = json.loads(response.content)
#     for conference in content["locations"]:
#         LocationVO.objects.update_or_create(
#             import_href=conference["href"],
#             defaults={"closet_name": conference["closet_name"]},
#         )


# def poll():
#     while True:
#         print('Hats poller polling for data')
#         try:
#             # Write your polling logic, here
#             pass
#         except Exception as e:
#             print(e, file=sys.stderr)
#         time.sleep(60)


# if __name__ == "__main__":
#     poll()
