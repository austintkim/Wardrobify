from django.urls import path
from . import views
from .views import api_list_hats, api_show_hat

urlpatterns = [
    path("hats/", api_list_hats, name="api_list_hats"),
    path('api/hats/<int:location_vo_id>/hats', views.api_list_hats, name="api_list_hats"),
    path("hats/<int:pk>/", api_show_hat, name="api_show_hat"),
]
