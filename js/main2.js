$(document).ready(function(){
	$('#imgContainer').hide();
	$('select#selRutas').on('change',function(){
		var name = $(this).val();	
		$('#imgContainer').show();
		$('#mapaImg').attr('src','img/'+name+'.png');
	});


$('select#selCamion').on('change',function(){
		var name = $(this).val();	
		$('#imgContainer').show();
		$('#mapaImg').attr('src','img/'+name+'.png');
	});
$('#horario_btn').on('click',function(){
		
		$('#imgContainer').hide();
		
	});
})