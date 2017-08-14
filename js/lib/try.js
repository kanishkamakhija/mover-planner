var styles = [{
        elementType: 'geometry',
        stylers: [{
            color: '#ebe3cd'
        }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#523735'
        }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#f5f1e6'
        }]
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#c9b2a6'
        }]
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#dcd2be'
        }]
    },
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#ae9e90'
        }]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#93817c'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{
            color: '#a5b076'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#447530'
        }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
            color: '#f5f1e6'
        }]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
            color: '#fdfcf8'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
            color: '#f8c967'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#e9bc62'
        }]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{
            color: '#e98d58'
        }]
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#db8555'
        }]
    },
    {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#806b63'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#8f7d77'
        }]
    },
    {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#ebe3cd'
        }]
    },
    {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{
            color: '#dfd2ae'
        }]
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{
            color: '#b9d3c2'
        }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#92998d'
        }]
    }

]

var viewModel = function() {

        this.searchReq = ko.observable("");
        this.map = ko.observable('');
        //creates blank array for all markers.
        this.markers = ko.observableArray([]);

        this.map = ko.computed(function initMap() {
            //const creates a new map
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 23.181467,
                    lng: 79.9864071
                },
                zoom: 13,
                styles: styles,
                myTypeControl: false
            });
            return map;
        })

        this.locations = ko.observableArray([{
                title: 'Pachmarhi',
                location: {
                    lat: 22.467446,
                    lng: 78.434585
                }
            },
            {
                title: 'Amarkantak',
                location: {
                    lat: 22.67486,
                    lng: 81.75908
                }
            },
            {
                title: 'Balancing Rocks ',
                location: {
                    lat: 23.1486,
                    lng: 79.9095
                }
            },
            {
                title: 'Dhuandhar Falls ',
                location: {
                    lat: 23.1103,
                    lng: 79.7961
                }
            }
        ]);

        this.searchBox = ko.compute(function() {
            var searchBox = new google.maps.places.SearchBox(document.getElementById('places-search'));
            searchBox.setBounds(map.getBounds());
            return searchBox;
        });

        searchBox.addListener('places_changed', function() {
            searchBoxPlaces(this);
        });

        this.largeInfowindow = ko.computed(function() {
            return new google.maps.InfoWindow();
        });
        this.bounds = ko.computed(function() {
            return new google.maps.LatLngBounds();
        });

        this.marker = ko.compute(function() {
                    for (var i = 0; i < locations.length; i++) {
                        var position = locations[i].location;
                        var title = locations[i].title;
                        this.marker = ko.compute(function() {
                                    var marker = new google.maps.Marker({
                                        map: map,
                                        position: position,
                                        title: title,
                                        animation: google.maps.Animation.DROP,
                                        id: i
                                    })
                                    return marker;
                                }
                                this.markers = ko.compute(function() {
                                    return markers.push(marker);
                                }); this.bounds = ko.compute(function() {
                                    return bounds.extend(marker.position);
                                });

                                this.map = ko.compute(function() {
                                    return map.fitBounds(bounds);
                                });

                                function searchBoxPlaces(searchBox) {
                                    var places = searchBox.getPlaces();
                                    //for each place get icon, name & location
                                    createMarkersForPlaces(places);
                                    if (places.length == 0) {
                                        window.alert('We did not find any places matching the search');
                                    }

                                }

                                ko.applyBindings(new viewModel());
