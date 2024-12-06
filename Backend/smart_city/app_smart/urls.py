from django.urls import path, include
from . import views
from .api import viewsets, filters
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()
router.register(r'sensores',viewsets.SensorViewSet)
router.register(r'Temperatura',viewsets.TemperaturaDataViewSet)
router.register(r'Umidade',viewsets.UmidadeDataViewSet)
router.register(r'Luminosidade',viewsets.LuminosidadeDataViewSet)
router.register(r'Contador',viewsets.ContadorDataViewSet)
urlpatterns = [
    path('',views.abre_index, name='abre_index'),
    path('api/create_user/', viewsets.CreateUserAPIViewSet.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/sensor_filter/',filters.SensorFilterView.as_view(), name='sensor_filter'),
    path('api/Temperatura_filter/',filters.TemperaturaFilterView.as_view(), name='sesor_filter'),
    path('api/Umidade_filter/', filters.UmidadeFilterView.as_view()),
    path('api/Luminosidade_filter/', filters.LuminosidadeFilterView.as_view()),
    path("api/Contador_filter/", filters.ContadorFilterView.as_view()),
]
