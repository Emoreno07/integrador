from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def abre_index(request):
    s = 'Hello World'
    return HttpResponse(s)


