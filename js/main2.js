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
	});
	$('#horario_btn').on('click',function(){
		$('select#selCamion option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selCamion').selectmenu("refresh", true);
		$('select#selRutas option[value=inicio]').attr('selected',true).siblings('option').removeAttr('selected');
		$('select#selRutas').selectmenu("refresh", true);
		$('#horario').show();		
		$('#imgContainer').hide();
		
	});
})