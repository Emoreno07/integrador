from django.urls import path, include
from . import views
from .api import viewsets, filters
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
router = DefaultRouter()
router.register(r'sensores',viewsets.SensorViewSet)
router.register(r'temperatura',viewsets.TemperaturaDataViewSet)
router.register(r'umidade',viewsets.UmidadeDataViewSet)
router.register(r'luminosidade',viewsets.LuminosidadeDataViewSet)
router.register(r'contador',viewsets.ContadorDataViewSet)
urlpatterns = [
    path('',views.abre_index, name='abre_index'),
    path('api/create_user/', viewsets.CreateUserAPIViewSet.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)),
    path('api/sensor_filter/',filters.SensorFilterView.as_view(), name='sensor_filter'),
    path('api/temperatura_filter/',filters.TemperaturaFilterView.as_view(), name='sesor_filter'),
    path('api/umidade_filter/', filters.UmidadeFilterView.as_view()),
    path('api/luminosidade_filter/', filters.LuminosidadeFilterView.as_view()),
    path("api/contador_filter/", filters.ContadorFilterView.as_view())
]
