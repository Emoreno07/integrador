from django.urls import path, include
from . import views
from .api import viewsets, filters
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()
router.register(r'sensores',viewsets.SensorViewSet)
urlpatterns = [
    path('',views.abre_index, name='abre_index'),
    path('api/create_user/', viewsets.CreateUserAPIViewSet.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/sensor_filter/',filters.SensorFilterView.as_view(), name='sensor_filter')
]
