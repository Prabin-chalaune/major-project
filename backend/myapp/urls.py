from django.urls import path

from .views import MlmodelView

urlpatterns = [
    path("model/", MlmodelView.as_view(), name="model_generate"),
]
