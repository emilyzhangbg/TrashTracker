from django.shortcuts import render
from django.http import HttpResponse
from django.utils.safestring import mark_safe
from django.template import Library
import json
import random
from datetime import date
#from django.views.decorators.csrf import csrf_exempt
# Create your views here.

# array version that worked: markers = []
markers = set()

trashReported = 166
trashRemoved = 0

numRequests = 0

today = date.today().day
date = date.today()

def randomMarker():
  return ((random.random()-0.5)/10+121.03,(random.random()-0.5)/10+14.6)


def compareTimes():
    global today, markers, trashReported,trashRemoved,date
    if today!=date.today().day:
        # Insert Code here that sends data to government
        # reset all values for new day
        today = date.today().day
        date = date.today()
        markers = set()
        trashReported = 0
        trashRemoved = 0

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
#@csrf_exempt
def index(request):
    global markers,trashRemoved,trashReported,date,numRequests
    compareTimes()
    print(get_client_ip(request))
    if numRequests == 0:
        for i in range(166):
          markers.add(randomMarker())
        numRequests = 1
    if request.method == "POST":
        if request.POST.get('type') == 'add':
          
            #print(markers)
            #array version: markers.append([float(request.POST.get('long')),float(request.POST.get('lat'))])
            markers.add((float(request.POST.get('long')),float(request.POST.get('lat')))) 
            trashReported+=1
            #print(request.POST)
        else:
            if not request.POST.get('removed') == "null":
                #print(request.POST.get('removed'))
                markers.remove((float(request.POST.get('long')),float(request.POST.get('lat'))))
                #print('removed')
            #print('happened')
            trashRemoved+=1
        #print(markers)
    return render(request, "trashfinder/Set.html",{
        "markers":markers,
        "trashReported":trashReported,
        "trashRemoved":trashRemoved,
        'today':date
    })

def splash(request):
    return render(request, "trashfinder/Splash.html")