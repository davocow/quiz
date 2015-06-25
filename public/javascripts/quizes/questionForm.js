$(document).ready(function(){
	var defaultValueTxtRespuesta = 'Respuesta';
	var defaultValueTxtPregunta = 'Pregunta';
	
	$(':text').focus(function(){
		if($(this).val() === defaultValueTxtPregunta || $(this).val() === defaultValueTxtRespuesta)
		{
			$(this).val('');
		}
	});
	
	$(':text').blur(function(){
		if($(this).val() === '')
		{
			$(this).val($(this).attr('id') === 'txtPregunta' ? defaultValueTxtPregunta : defaultValueTxtRespuesta);
		}
	});	 
});