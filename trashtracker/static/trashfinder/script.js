//boutta hard code api key in js :skull:
mapboxgl.accessToken =
'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';
function arandomLat(){
    return (Math.random()-0.5)/10+14.6;
}
function arandomLng(){
    return (Math.random()-0.5)/10+121.03;
}
function arandomOneDeci(){
    return Math.round(Math.random()*10)/10
}
var lat;
var long;
navigator.geolocation.getCurrentPosition(function (position) {
lat = position.coords.latitude;
long = position.coords.longitude;
/*document.getElementById('foundTrashButton').addEventListener("click", function () {
    alert("clicked")
    /*var longitude=arandomLng();
    var latitude=arandomLat();
    var marker1 = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    var xhr = new XMLHttpRequest();
    console.log(longitude)
    xhr.open("POST", 'map', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "long": longitude,
        "lat": latitude
    }));
});*/

//pythagorean formula should work right - no need to convert into metres or anything
function getDistance(long1,lat1,long2,lat2){
    return Math.sqrt((long1-long2)**2 + (lat1-lat2)**2);
}

//loops thru all markers, calculates distance, returns the minimum marker (via a dict key)
function getClosestMarker(testmarkers,long,lat){
    var minDistance, minKey;
    var minlong, minlat;
    for(i = 0;i<testmarkers.length;i++){
        //console.log("a",testmarkers[i])
        if (minDistance == undefined){
            minDistance = getDistance(testmarkers[i][0],testmarkers[i][1],long,lat);

            minlong = testmarkers[i][0];
            minlat = testmarkers[i][1];

            minKey = testmarkers[i][0];
        }
        else{
            var currDistance = getDistance(testmarkers[i][0],testmarkers[i][1],long,lat);
            if(currDistance<minDistance){
                minDistance = currDistance;
                minKey = testmarkers[i][0];

                minlong = testmarkers[i][0];
                minlat = testmarkers[i][1];
            }
        }
    }
    console.log(minDistance,minlong,minlat,long,lat)
    //console.log(minKey)
    //0.4 is roughly 500m
    if(minDistance<0.004){
        return [minKey,minlong,minlat];
    }
    //if no marker within range, then do not remove a marker
    return [null,minlong,minlat];
}

//this in theory should remove the marker from the map
function removeMarker(key){
    if(key!=null){
        allMarkers[key].remove();
    }
}

function findElement(markers,marker){
    for(i=0;i<markers.length;i++){
        if(marker[0] == markers[i][0] && marker[1] == markers[i][1]){
            return i
        }
    }
    return -1
}
names = ["Fan Yang", "Emily Zhang", "Julien Liang", "Senthan Sivatharan"];

$(document).ready(function(){
    names.sort(() => Math.random() - 0.5)
    $('#footer').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TrashTracker&#169; Created by " + names[0] +", " + names[1] + ", " + names[2] + ", and " + names [3]);

    //orange button
    $("#foundTrashButton").click(function(){
      //currently uses randomly generated coordinates since otherwise the markers would only appear on setHacks members' homes, which would be less than ideal
      //randomly generated coordinates are in Manila, Philippines, where Joe presumably lives
        var longitude=arandomLng();
        var latitude=arandomLat();
        var currMarker = new mapboxgl.Marker({
            color: color_scale(arandomOneDeci()).hex()
        })
            .setLngLat([longitude, latitude])
            .addTo(map);
        allMarkers[longitude] = currMarker;
        markers.push([longitude,latitude])
        $.post("map",
        {
            'type': "add",
            'long': longitude.toString(),
            'lat': latitude.toString()
        },
        function(data,status){
        });
    });
    //green button
    $("#removedTrashButton").click(function(){
        var longitude=arandomLng();
        var latitude=arandomLat();
        //console.log(longitude,latitude)
        var values = getClosestMarker(markers,longitude,latitude);
        console.log(values)
        //console.log(markers)
        //remove marker from the map only if minDistance of less than 0.4 was returned
        if(values[0]!=null){
            removeMarker(values[0]);
            
            //remove marker from the markers array
            var index = findElement(markers,[values[1],values[2]]);
            //console.log("index",index);

            markers.splice(index,1);
            
            //remove marker from backend data @python
        }
            $.post("map",
            {
            'type': "remove",
            'removed': String(values[0]),
            'long': values[1].toString(),
            'lat': values[2].toString()
            },
            function(data,status){
            });
        
    });

  });

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [long, lat],
    zoom: 18 //ah yes, lets all see our own house
});

//stores every longitude, marker pair
var allMarkers = {}
var color_scale = chroma.scale(['yellow', 'red']);

map.on('load', () => {
    //console.log(markers);
    for (i = 0;i<markers.length;i++){
        //console.log(markers[i])
        var currMarker = new mapboxgl.Marker({
            color: color_scale(arandomOneDeci()).hex()
        })
            .setLngLat([markers[i][0], markers[i][1]])
            .addTo(map);
        //console.log(currMarker)
        //add marker to allMarkers
        allMarkers[markers[i][0]] = currMarker;
    }
        

});
});