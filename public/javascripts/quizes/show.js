$(document).ready(function(){
	var defaultValueTxtRespuesta = 'Responda aquí';
	
	$('#txtRespuesta').focus(function(){
		if($('#txtRespuesta').val() === defaultValueTxtRespuesta)
		{
			$('#txtRespuesta').val('');
		}
	});
	
	$('#txtRespuesta').blur(function(){
		if($('#txtRespuesta').val() === '')
		{
			$('#txtRespuesta').val(defaultValueTxtRespuesta);
		}
	});
	
	
	$('#txtRespuesta').val(defaultValueTxtRespuesta);
	 
});