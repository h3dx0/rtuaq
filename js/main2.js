$(document).ready(function(){
	$('#imgContainer').hide();
	$('#horario').hide();
	$('select#selRutas').on('change',function(){
		
		$('#horario').hide();
		var name = $(this).val();
		var texto = $("select#selRutas option:selected" ).text();	
		if (name!='inicio') {
			$('#msj').html('Ruta del camión de '+ texto);
		} else{
			$('#msj').html('');
		};
		$('#imgContainer').show();
		$('#mapaImg').attr('src','img/'+name+'.png');
		
		$('select#selCamion option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selCamion').selectmenu("refresh", true);
		$('select#horario_select option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#horario_select').selectmenu("refresh", true);
	});


	$('select#selCamion').on('change',function(){
		
		$('#horario').hide();		
		var name = $(this).val();	
		var texto = $("select#selCamion option:selected" ).text();
		if (name!='inicio') {
			$('#msj').html('Posición del camión de '+ texto);
		} else{
			$('#msj').html('');
		};
		
		$('#imgContainer').show();
		$('#mapaImg').attr('src','img/'+name+'.png');
		
		$('select#selRutas option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selRutas').selectmenu("refresh", true);
		$('select#horario_select option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#horario_select').selectmenu("refresh", true);
	});
	$('#horario_btn').on('click',function(){
		$('select#selCamion option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selCamion').selectmenu("refresh", true);
		$('select#selRutas option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selRutas').selectmenu("refresh", true);
		$('#imgContainer').hide();
		
	});

	$('select#horario_select').on('change',function(){
		$('#horario').show();
		var valor = $(this).val();	

		if (valor=="cua") {
			$('#cua h2').html("Ruta CU a Aereopuerto");
			$('#cua').show();
			$('#cuj').hide();
			$('#cub').hide();
			console.log(valor);
		} else if(valor == "cuj"){
			$('#cuj h2').html("Ruta CU a Juriquilla");
			$('#cua').hide();
			$('#cuj').show();
			$('#cub').hide();
			console.log(valor);

		}else{
			$('#cub h2').html("Ruta CU a Bicentenario");
			$('#cua').hide();
			$('#cuj').hide();
			$('#cub').show();
			console.log(valor);

		}					

	});

})