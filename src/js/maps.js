export default function maps() {

    let button = document.getElementsByClassName('location-button__map'),
        form = document.querySelector('.form-location'),
        geocoder,
        adress = 'Минск улица Немига';


    button[0].addEventListener('click', () => {
    	document.querySelector('#map').textContent = '';
        initMapGoogle();
    });

    button[1].addEventListener('click', () => {
    	document.querySelector('#map').textContent = '';
        ymaps.ready(init);
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let input = form.querySelector('input');
        adress = input.value;

        if (button[0].classList.contains('active-tab')) {
            document.querySelector('#map').textContent = '';
            initMapGoogle();
        } else {
            document.querySelector('#map').textContent = '';
            ymaps.ready(init);
        }
    });

    ymaps.ready(init);

    function init() {
        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('active-tab');
        }

        button[1].classList.add('active-tab');

        let myGeocoder = ymaps.geocode(adress),
            res = myGeocoder.then(
                function(result) {
                    let coordinates = result.geoObjects.get(0).geometry.getCoordinates();
                    console.log(coordinates);
                    let myMap = new ymaps.Map(document.querySelector('#map'), {
                        center: coordinates,
                        zoom: 17,
                        // controls: ['geolocationControl', 'fullscreenControl']
                    });

                    let myPlacemark = new ymaps.Placemark(coordinates, {
                        hintContent: 'Наша свадьба тут!',
                        balloonContent: adress
                    });

                    myMap.geoObjects.add(myPlacemark);
                    myMap.controls.remove('searchControl');
                },
                function(err) {
                    alert('Ошибка');
                }
            );

        // Создание карты.    

    }


    function initMapGoogle() {

        for (let i = 0; i < button.length; i++) {
            button[i].classList.remove('active-tab');
        }

        button[0].classList.add('active-tab');

        geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(-34.397, 150.644);

        let myOptions = {
            zoom: 17,
            center: latlng,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        let map = new google.maps.Map(document.getElementById("map"), myOptions);

        if (geocoder) {
            geocoder.geocode({
                'address': adress
            }, (results, status) => {

                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        let infowindow = new google.maps.InfoWindow({
                            content: '<b>' + adress + '</b>',
                            size: new google.maps.Size(150, 50)
                        });

                        let marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: adress
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }

    }

}