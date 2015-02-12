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
		$('select#selRutas option[value=inicio]').prop('selected','selected');
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
		$('select#selCamion option[value=inicio]').prop('selected','selected');
	});
	$('#horario_btn').on('click',function(){
		$('#horario').show();		
		$('#imgContainer').hide();
		
	});
})