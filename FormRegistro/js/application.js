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

function checkPronvincia() {
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
		//Datos de domicilio - DGN
		if (document.getElementById('txtCalle').value == "") {
			$('#txtCalle').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#txtCalle').removeClass('is-invalid').addClass('is-valid');
		}
		
		if (document.getElementById('txtAltura').value == ""
			|| !Number(document.getElementById('txtAltura').value)) {
			$('#txtAltura').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#txtAltura').removeClass('is-invalid').addClass('is-valid');
		}
		
		if (document.getElementById('txtPiso').value == ""
			|| !Number(document.getElementById('txtPiso').value)) {
			$('#txtPiso').addClass('is-invalid');
			error = true;
		} else {
			percent += 10;
			$('#txtPiso').removeClass('is-invalid').addClass('is-valid');
		}
				
		// fin-DGN
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