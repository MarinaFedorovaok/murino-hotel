ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [60.058511, 30.415267],
        zoom: 10 // от 0 (весь мир) до 19.
    });
    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [60.058511, 30.415267]
        },
        properties: {
            iconContent: 'Апартаменты',
            hintContent: 'Воронцовский 11/6, 131'
        }
    }, {
        preset: 'islands#blackStretchyIcon',
        draggable: true
    });
    myMap.geoObjects.add(myGeoObject);
}
