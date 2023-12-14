from django.urls import path
from . import views
from .views import api_list_hats, api_show_hat

urlpatterns = [
    path("api/hats/", api_list_hats, name="api_list_hats"),
    # path(
    #     "locations/<int:location_vo_id>/hats/",
    #     api_list_hats,
    #     name="api_list_hats",
    # ),
    path("api/hats/<int:pk>/", api_show_hat, name="api_show_hat"),
    path('api/hats/<int:location_vo_id>/', views.api_list_hats),
]
