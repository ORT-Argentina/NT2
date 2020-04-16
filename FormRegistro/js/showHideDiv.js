$(document).ready(function(){

	$("#botonEnviar").hide();
	$(".datos_domicilio").hide();
	$(".datos_de_contacto").hide();
	$(".datos_laborales").hide();
	$(".motivo_consulta").hide();

	var pagina = 0;
 
	showHideDiv = function(){

		pagina++;

		if (pagina == 1){
			
			$(".datos_personales").hide();

			$(".datos_domicilio").show();
			
		} else if (pagina == 2) {

			$(".datos_domicilio").hide();

			$(".datos_de_contacto").show();



		} else if (pagina == 3){

			$(".datos_de_contacto").hide();

			$(".datos_laborales").show();
			
		}else {

			$(".datos_laborales").hide();

			$(".motivo_consulta").show();

			$("#botonSiguiente").hide();

			$("#botonEnviar").show();


		};

	}	
});