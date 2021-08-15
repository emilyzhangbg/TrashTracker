from django.shortcuts import render
from django.http import HttpResponse
from django.utils.safestring import mark_safe
from django.template import Library
import json
from datetime import date
#from django.views.decorators.csrf import csrf_exempt
# Create your views here.

# array version that worked: markers = []
markers = set()

trashReported = 0
trashRemoved = 0

today = date.today().day
date = date.today()
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

#@csrf_exempt
def index(request):
    compareTimes()
    global markers,trashRemoved,trashReported,date
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