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

function checkNacionalidad() {
	var object = event.target;

	console.log(event.target.value);

	$.get("json/buenos-aires.json", function (data) {
		console.log("Martin");
	});

	//console.log($(event.target).children(":first").data('ort'));

	if (event.target.value == "ciudad") {
		$("#cmbLocalidad").parent().show('slow');
	} else {
		$("#cmbLocalidad").parent().hide('slow');
		//document.getElementById('cmbLocalidad').parentNode.setAttribute('style', 'display:none');
	}

}

function validarForm(e) {
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

		$(".progress-bar").css('width', percent + '%');

		return false;

	} catch (e) {
		console.log(e);
	}

	return error ? false : true;
}

function continuar(step) {
	switch (step) {
		case 1:
			renderDomicilio();
			break;
	}
}

// renderizar el step domicilio y ocultar el step anterior
function renderDomicilio() {
	let thisStep = $("#step1");
	thisStep.prop("hidden", true);
	let nextStep = $("#step2");
	nextStep.prop("hidden", false);
}

// al cambiar el combo box provincia, renderizar localidades
$("#cmbProvincia").change(function () {
	if ($(this).val() == "") {
		$('#localidad').hide();
		$('#cmbLocalidad').removeAttr('required');
		$('#cmbLocalidad').removeAttr('data-error');
	} else {
		$('#localidad').show();
		$('#cmbLocalidad').attr('required', '');
		$('#cmbLocalidad').attr('data-error', 'This field is required.');

		$("#cmbLocalidad").empty();
		var texto = "Elija una localidad";
		var valor = ""
		var o = new Option(texto, valor);
		$(o).html(texto);
		$("#cmbLocalidad").append(o);

		switch ($(this).val()) {
			case "caba":
				var texto = "Agronomia";
				var valor = "agronomia"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Almagro";
				var valor = "almagro"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Devoto";
				var valor = "devoto"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Villa Urquiza";
				var valor = "villa-urquiza"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Villa Ortuzar";
				var valor = "villa-ortuzar"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				break;
			case "buenos-aires":
				var texto = "San Isidro";
				var valor = "san-isidro"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Villa Ballester";
				var valor = "ballester"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "San Justo";
				var valor = "san-justo"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				var texto = "Avellaneda";
				var valor = "avellaneda"
				var o = new Option(texto, valor);
				$(o).html(texto);
				$("#cmbLocalidad").append(o);
				break;
		}
	}
});

// habilita o deshabilita el campo Número de trámite solamente si se selecciona DNI
$("#cmbTipoDocumento").change(function () {
	let tipoDoc = $(this).val();
	let nroTramite = $("#txtNumeroTramite");
	if (tipoDoc == "dni") {
		nroTramite.prop("disabled",false);
	} else {
		nroTramite.val("");
		nroTramite.prop("disabled",true);
	}
});