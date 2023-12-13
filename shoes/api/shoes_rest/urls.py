from django.urls import path

from .views import list_shoes, show_shoes

urlpatterns = [
    path("shoes/", list_shoes, name="create_shoes"),
    path("bins/<int:bin_vo_id>/shoes/",
         list_shoes,
         name="list_shoes"),
    path("shoes/<int:pk>/", show_shoes, name="shoe_shoes")
]
