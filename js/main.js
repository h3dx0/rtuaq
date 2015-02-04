$(document).ready(function(){
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;
	var ubicar = false;
	var timer;
	var markers=[];
	
	//var serviceURL = "http://ingenieria.uaq.mx/rtuaq/servicio/";
	var serviceURL = "http://localhost/rtuaq/web/servicio/";
	$('#map-canvas').hide();
	function initialize() {
		$('#map-canvas').show();
		paintMap(20.592664, -100.413478,18);				
	}
	timer = $.timer(function() {

		$.getJSON(serviceURL + 'getCamionPos.php?ruta='+valor, function(data) {		
			datos = data.items[0];
			LocationData = data.paradas;
			paintMap(datos.lt,datos.ln,15);
	 		//pintarParadas(LocationData);
	 		crearMarcador(datos.lt,datos.ln,'Posicion actual del camion');
	 	});

	});	

	$('#horario_btn').click(function(){
		$('#map-canvas').hide();
	})

	$('select#selRutas').on('change',function(){

		ubicar = false;
		$('#map-canvas').show();

		valor = $(this).val();

		$.getJSON(serviceURL + 'getRutaFija.php?ruta='+valor, function(data) {		
			datos = data.items[0];
			LocationData = data.paradas;	 		
			origen = new google.maps.LatLng(datos.lt, datos.ln);
			destino = new google.maps.LatLng(20.592664, -100.413478,16);
			calcRoute(origen,destino);
			console.log()
			if (LocationData != null) {
				pintarParadas(LocationData);
			} else{
				clearMarkers();
			};

		});
		timer.pause();

	});
	$('#consultar_btn,#localizar_btn').click(function() {
		clearMarkers(markers)
	});
	$('select#selCamion').on('change',function(){
		ubicar = true;

		$('#map-canvas').show();

		ubicar = true;
		valor = $(this).val();
		$.getJSON(serviceURL + 'getCamionPos.php?ruta='+valor, function(data) {		
			datos = data.items[0];
			LocationData = data.paradas;
			paintMap(datos.lt,datos.ln,15);
	 		//pintarParadas(LocationData);
	 		crearMarcador(datos.lt,datos.ln,'Posicion actual del camion');
	 	});
		timer.play();

	});
	$('#horario_btn').click(function(){
		ubicar = false;
	});

	timer.set({ time : 10000});
	if (!ubicar) {

		timer.pause();
	}
	function clearMarkers() {
		console.log(markers.length)
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}

	function paintMap(latitud,longitud,zoom) {

		directionsDisplay = new google.maps.DirectionsRenderer();
		var uaq = new google.maps.LatLng(latitud, longitud);
		var mapOptions = {
			zoom:zoom,			
			streetViewControl: true,
			center: uaq
		}
		var infowindow = new google.maps.InfoWindow();
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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


	function pintarParadas(LocationData)
	{
		console.log('entro a la funcion');
		var bounds = new google.maps.LatLngBounds();
		var infowindow = new google.maps.InfoWindow();
		console.log('esto q es' + map);
		for (var i in LocationData)
		{
			var p = LocationData[i];
			console.log('latitud'+p.lt);
			console.log('longitud'+p.ln);

			var latlng = new google.maps.LatLng(parseFloat(p.lt), parseFloat(p.ln));
			bounds.extend(latlng);

			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: p.descripcion
			});
			markers[i]= marker;
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(this.title);
				infowindow.open(map, this);
			});
		}
		
		map.fitBounds(bounds);
	}

	function crearMarcador(lt,ln,descripcion){
		posicion = new google.maps.LatLng(parseFloat(lt),parseFloat(ln));
		marker = new google.maps.Marker({
			position: posicion ,				 
			map: map,
			title:descripcion,					
		});		
	}
	google.maps.event.addDomListener(document.getElementById('selRutas-button'), 'click', initialize);
	//google.maps.event.addDomListener(window, 'load', initialize);
})