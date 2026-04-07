from django.urls import path

from .views import create_lead, public_content

urlpatterns = [
    path("content/", public_content, name="public-content"),
    path("leads/", create_lead, name="create-lead"),
]
