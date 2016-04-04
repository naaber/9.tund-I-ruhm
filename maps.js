(function(){
    "use strict";

    var MapsApp = function(){

        if(MapsApp.instance){
            return MapsApp.instance;
        }
        MapsApp.instance = this;

        this.container = null;
        this.map = null;

        this.init();
    };

    window.MapsApp = MapsApp;

    MapsApp.prototype = {

        init: function(){

            console.log('MapsApp started');

            this.container = document.querySelector('#map-container');

            var awesomeType = new google.maps.StyledMapType([ { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "transit", "stylers": [ { "color": "#33ccff" }, { "visibility": "off" } ] },{ "featureType": "road", "stylers": [ { "color": "#ff0000" } ] },{ } ], {name: "Awesome"});

            var options = {
              center: {lat: 59.4387028, lng: 24.7717822},
              zoom: 10,
              streetViewControl: false,
              mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, "Awesome"]
              }
            };

            //google.maps viide teegile
            this.map = new google.maps.Map(this.container, options);

            //teen uue kaardi tüübi
            this.map.mapTypes.set("Awesome", awesomeType);
            this.map.setMapTypeId("Awesome");

            //kuulan klikke
            this.map.addListener('click', function(e){
              console.log(e.latLng.lat() + " " + e.latLng.lng());
              MapsApp.instance.createNewMarker(e.latLng.lat(), e.latLng.lng());
            });

        },

        createNewMarker: function(newLat, newLng){

          var p = prompt("Lisa kohanimi");

          if(!p){
            return;
          }

          var options = {
            map: this.map,
            position: {lat: newLat, lng: newLng},
            animation: google.maps.Animation.DROP,
            draggable: true
          };
          var new_marker = new google.maps.Marker(options);

          var infoOptions = {
            content: '<strong>' + p + '<strong>'
          };

          var new_infoWindow = new google.maps.InfoWindow(infoOptions);

          //seon markeriga
          new_infoWindow.open(this.map, new_marker);

        },

    };

    window.onload = function(){
        var app = new MapsApp();
    };

})();
