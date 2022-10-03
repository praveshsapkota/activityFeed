from django.urls import path
from . import views

urlpatterns = [
    path('', views.getFeed),
    path('create', views.createFeed),
    path('update/<int:id>', views.updateFeed),
    path('delete/<int:id>', views.deleteFeed)
]
