$(document).ready(function(){
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;

	// $.ajax({
	// 	type: "POST",
	// 	url: "negocio/consultar.php",
	// 	data: { accion: "cargarCombo" },
	// 	success:function(respuesta){
	// 		rutas = $.parseJSON(respuesta);					
	// 		for (var i = rutas.length - 1; i >= 0; i--) {
	// 			ruta = rutas[i];
	// 			$('#selRutas option:last-child').after('<option value='+ruta.id+'>'+ruta.id_camion+'</option>');						
	// 		};

	// 	}
	// });
	function initialize() {
		paintMap(20.592664, -100.413478,18);				
	}

	$('select#selRutas').on('change',function(){

		var valor = $(this).val();
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/servicio/getRutaFija.php",
			data: { ruta:valor },
			success:function(respuesta){
				rutasArray = $.parseJSON(respuesta);

				rutas = rutasArray.ruta[0]
				paradas = rutasArray.paradas

				paintMap(rutas.lt,rutas.ln,15,paradas);
				origen = new google.maps.LatLng(rutas.lt, rutas.ln);
				destino = new google.maps.LatLng(20.592664, -100.413478,16);
				$('#directionsPanel').html('');
				calcRoute(origen,destino,paradas);
			}
		});				
	});



	function paintMap(latitud,longitud,zoom,paradas) {
		
		directionsDisplay = new google.maps.DirectionsRenderer();
		var uaq = new google.maps.LatLng(latitud, longitud);
		var mapOptions = {
			zoom:zoom,			
			streetViewControl: true,
			center: uaq
		}
		var infowindow = new google.maps.InfoWindow();
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		if (paradas) {
			for (var i = 0; i < paradas.length; i++) {	
			console.log(paradas[i].lt);		
			console.log(paradas[i].descripcion);		
				posicion = new google.maps.LatLng(parseFloat(paradas[i].lt),parseFloat(paradas[i].ln));
				marker = new google.maps.Marker({
					position: posicion ,				 
					map: map,
					title:paradas[i].descripcion,
					zIndex: i + 1,
			}	);
				
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(paradas[i].descripcion);
						infowindow.open(map, marker);
					}
				})(marker, i));
			};


		};
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById("directionsPanel"));

	}

	function calcRoute(start,end) {	
		var waypts = [];

		var request = {
			origin:start,
			destination:end,
			//waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
	}

	google.maps.event.addDomListener(window, 'load', initialize);	
})