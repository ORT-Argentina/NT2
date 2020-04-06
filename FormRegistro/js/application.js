$(document).ready(function () {

	$('input').on('blur', function () {
		$('#helpInfo').html("Información adicional");
	});

	$('input').on('focus', function () {
		if ($(this).data('info'))
			$('#helpInfo').html($(this).data('info'));
	});

	$('#txtphone').mask('(00) 00000-0000');

});

function checkPronvincia(id) {
	var domicilioPersonal = document.getElementById("cmbProvincia");
	var domicilioLaboral = document.getElementById("cmbProvinciaL");
	var divDomicilio = document.getElementById("divLocalidad");
	var divLaboral = document.getElementById("divLocalidadL");
	var divContenedorProvinciaD = document.getElementById("contenedorProvinciaD");
	var divContenedorProvinciaL = document.getElementById("contenedorProvinciaL");

	if(domicilioPersonal.id == id){
		divDomicilio.style.display = "none";
		divContenedorProvinciaD.className = divContenedorProvinciaD.className.replace(" col-sm-6 col-lg-6", " col-sm-12 col-lg-12") ;
		if(domicilioPersonal.value=="ciudad"){
			divDomicilio.style.display = "block";
			divContenedorProvinciaD.className = divContenedorProvinciaD.className.replace(" col-sm-12 col-lg-12", " col-sm-6 col-lg-6") ;
		}
	}else{
		divLaboral.style.display = "none";
		divContenedorProvinciaL.className = divContenedorProvinciaL.className.replace(" col-sm-6 col-lg-6", " col-sm-12 col-lg-12") ;
		if(domicilioLaboral.value=="ciudad"){
			divLaboral.style.display = "block";
			divContenedorProvinciaL.className = divContenedorProvinciaL.className.replace(" col-sm-12 col-lg-12", " col-sm-6 col-lg-6") ;
		}
	}	
}

function validInput(e) {
	var first = false;
	var percent = 0;
	var error = false;

	try {
		if (document.getElementById('txtNombre').value == "") {
			error = true;
			document.getElementById('txtNombre').setAttribute('class', 'form-control is-invalid');
		} else {
			percent += 10;
			//Con JQuery
			$('#txtNombre').removeClass('is-invalid').addClass('is-valid');
		}

		if (document.getElementById('txtApellido').value == "") {
			$('#txtApellido').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#txtApellido').removeClass('is-invalid').addClass('is-valid');
		}

		if (document.getElementById('txtDni').value == ""
			|| !Number(document.getElementById('txtDni').value)) {
			$('#txtDni').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#txtDni').removeClass('is-invalid').addClass('is-valid');
		}

		if ($('#cmbProvincia').val() == "") {
			$('#cmbProvincia').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#cmbProvincia').removeClass('is-invalid').addClass('is-valid');
		}

		if (document.getElementById('txtEmail').value.indexOf("@") < 0
			|| document.getElementById('txtEmail').value.indexOf(".") < 0
			|| document.getElementById('txtEmail').value.length < 4) {
			$('#txtEmail').addClass('is-invalid');
			error = true;
		} else {
			percent += 20;
			$('#txtEmail').removeClass('is-invalid').addClass('is-valid');
		}

		if ($('#txtphone').val() == "") {
			error = true;
			$('#txtphone').addClass('is-invalid');
		} else {
			percent += 20;
			$('#txtphone').removeClass('is-invalid').addClass('is-valid');
		}

		if (!$("#chkTerms").is(':checked')) {

			$('#chkTerms').parents(".form-check:first").addClass('wobble animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
				$(this).removeClass('wobble animated');
			});
		}
		// agregado para validar matricula y autoridad

		/*  el if verifica si es ta marcado el checkbox y si el valor esta vacio para actualizar el estado en invalid o del caso contrario en valido

		if ( document.getElementById('chkPSalud').is(':checked') && document.getElementById('matricula').value == "") {
			$('#matricula').addClass('is-invalid');
			error = true;
		} else {
			
			$('#matricula').removeClass('is-invalid').addClass('is-valid');
		}
		
		if ( document.getElementById('chkPSalud').is(':checked') && document.getElementById('autoridad').value == "") {
			$('#autoridad').addClass('is-invalid');
			error = true;
		} else {
			
			$('#autoridad').removeClass('is-invalid').addClass('is-valid');
		}  */

		$(".progress-bar").css('width', percent + '%');

		return false;

	} catch (e) {
		console.log(e);
	}

	return error ? false : true;
}

//---------------------------------------- INICIO VISUALIZACIÓN TABS ---------------------------------------//
var currentTab = 0; // Por fecto inicia en el primer tab posicion (0)
showTab(currentTab); // Activa la visualizacion del tab actual (El primero).

function showTab(n) {
  // Esta funcion muestra el tab recibido por parametro...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:
	if (n == 1 && !validateForm()) return false;
	if (!validFirstPage()) return false;
	if (currentTab==2 && !validThirdPage()) return false;
	// Hide the current tab:
	x[currentTab].style.display = "none";
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// if you have reached the end of the form... :
	if (currentTab >= x.length) {
	//...the form gets submitted:
		document.getElementById("regForm").submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}
  
function validateForm() {
	// This function deals with validation of the form fields
	var x, y, i, valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	// A loop that checks every input field in the current tab:
	for (i = 0; i < y.length; i++) {
		// If a field is empty...
		if (y[i].value == "") {
			// add an "invalid" class to the field:
			y[i].className += " invalid";
			// and set the current valid status to false:
			valid = false;
		}
		else{
			y[i].className = y[i].className.replace(" invalid", "") ;
		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}
  
function fixStepIndicator(n) {
// This function removes the "active" class of all steps...
var i, x = document.getElementsByClassName("step");
for (i = 0; i < x.length; i++) {
	x[i].className = x[i].className.replace(" active", "");
}
//... and adds the "active" class to the current step:
x[n].className += " active";
}

  //-------------------------------------- FIN VISUALIZACION TABS -------------------------------------------//



 // --------------- Es profesional de la salud ? muestra el cambio en caso de ser si!---------//
  function checkProfesionalSalud() {
	var esProSalud = document.getElementById("chkPSalud");
	var divMatricula = document.getElementById("divMatricula");
	var divAutoridad = document.getElementById("divAutoridad");
	var inpMatricula = document.getElementById("matricula");
	var inpAutoridad = document.getElementById("autoridad");
	
	
		if(esProSalud.checked){
			divMatricula.style.display = "block";
			divAutoridad.style.display = "block";
			
			
		}else{
			divMatricula.style.display = "none";
			divAutoridad.style.display = "none";
			//inpMatricula.className.replace("invalid","valid");  no funciono esta opcion para actualizar el estado del className en valido 
			//inpAutoridad.className.replace("invalid","valid");  y poder continuar sin los campos requeridos 
		}
	}
		

