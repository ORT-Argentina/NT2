function validFirstPage(){
    //text="[a-zA-Z ]{2,254}" //--> Te permitirá ingresar letras de la a la z, un mínimo de 2 caracteres y máximo 254
    var nacionalidad, genero, documento, nDocumento, nTrámite, fNacimiento, nombre, apellido;
    nombre = document.getElementById("txtNombre").value;
    apellido = document.getElementById("txtApellido").value;
    nacionalidad = document.getElementById("txtNacionalidad").value;
    nDocumento = document.getElementById("txtNacionalidad").value;
    nTrámite = document.getElementById("txtNombre").value;
    fNacimiento = document.getElementById("txtApellido").value;
    if(nombre == "" || apellido=="" || nacionalidad==0 || nDocumento=="" || nTrámite=="" || fNacimiento==""){
        alert("Todos los campos deben ser completados");
        return false;
    }
    if(text!=nombre || text!= apellido){
        return false;
    }
    
}

function restriLetras(entrada){
    key = entrada.keyCode || entrada.which;
    teclado = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnopqrstuvwxyz";
    especiales = "8-37-38-46"; //---> (8:backSpace,37:flechaIzq,38:flechaDer,46:suprimir);
    teclaEspecial = false;
    for(let i in especiales){
        if(key==especiales[i]){
            teclaEspecial=true;break;
        }
    }
    if(letras.indexOf(teclado)==-1 && !teclaEspecial){
        return false;
    }
}



/*var expresionMail = /\w+@\w+\.+[a-z]/;

if(!expresionMail.test(email)){
    alert("email incorrecto");
    return false;
}
return true;*/