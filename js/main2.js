$(document).ready(function(){
	
	$('select#selRutas').on('change',function(){
		var name = $(this).val();	
		console.log(name);
		$('#mapaImg').attr('src','img/'+name+'.png');
	});


$('select#selCamion').on('change',function(){
		var name = $(this).val();	
		$('#mapaImg').attr('src','img/'+name+'.png');
	});

})