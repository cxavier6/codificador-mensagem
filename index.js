var mensagem = document.getElementById('mensagem');
var entradaCifra = document.querySelector('.entradaCifra');
var cifraBase64 = document.getElementById('base64');
var incrementoCifra = document.getElementById('incrementoCifra')
var codificarOuDecodificar = document.getElementById('codificarOuDecodificar');
var radioButton = document.querySelector('.radioButton');
var codificar = document.getElementById('btnCodificar');
var decodificar = document.getElementById('btnDecodificar');
var saidaMensagem = document.getElementById('saidaMensagem');

function selecao() {
entradaCifra.addEventListener("click", function() {
    if (entradaCifra.value == "cifraDeCesar") {
        incrementoCifra.style.display = "block";
    } else {
        incrementoCifra.style.display = "none";
    }
});
}

radioButton.addEventListener("click", function() {
    if (codificar.checked) {        
        codificarOuDecodificar.innerHTML = "Codificar Mensagem!";
    } else if (decodificar.checked) {       
        codificarOuDecodificar.innerText = "Decodificar Mensagem!";
    }
});

//Codificando e decodificando com base64
function encodeDecodeBase64() {
    var mensagem = document.getElementById('mensagem').value;

    if (codificar.checked) {
        var encodeBase64 = btoa(mensagem)
        return encodeBase64;
    } else if (decodificar.checked) {
        var decodeBase64 = atob(mensagem)
        return decodeBase64;
    }   
}

//Codificando e decodificando com cifra de césar
function encodeDecodeCifraDeCesar() {
    var mensagem = document.getElementById('mensagem').value;
    var incremento = document.getElementById('incremento').value;
    var encode = "";
    var decode = "";

    if (codificar.checked) {
        for (var i = 0; i < mensagem.length; i++) {
            var codigoAscii = mensagem[i].charCodeAt();
            if (codigoAscii >= 65 && codigoAscii <= 90) {
                var deslocamento = codigoAscii + parseInt(incremento);
                if (deslocamento > 90) {
                    deslocamento = deslocamento - 26;
                }
                encode += String.fromCharCode(deslocamento)
            } else if (codigoAscii >= 97 && codigoAscii <= 122) {
                var deslocamento = codigoAscii + parseInt(incremento);
                if (deslocamento > 122) {
                    deslocamento = deslocamento - 26;
                }
                encode += String.fromCharCode(deslocamento);
            } else {
                encode += mensagem[i];
            }
        }
        return encode;

    } else if (decodificar.checked) {
        for (var i = 0; i < mensagem.length; i++) {
            var codigoAscii = mensagem[i].charCodeAt();
            if (codigoAscii >= 65 && codigoAscii <= 90) {
                var deslocamento = codigoAscii - parseInt(incremento);
                if (deslocamento < 65) {
                    deslocamento = deslocamento + 26;
                }
                decode += String.fromCharCode(deslocamento);
            } else if (codigoAscii >= 97 && codigoAscii <= 122) {
                var deslocamento = codigoAscii - parseInt(incremento);
                if (deslocamento < 97) {
                    deslocamento = deslocamento + 26;
                }
                decode += String.fromCharCode(deslocamento);
            } else {
                decode += mensagem[i];
            }
        }
        return decode;    
    }
}

//Exibindo a saída da mensagem
codificarOuDecodificar.addEventListener("click", function (event) {
    event.preventDefault();
    if (entradaCifra.value == "cifraDeCesar") {
        saidaMensagem.value = encodeDecodeCifraDeCesar();
    } else if (entradaCifra.value == 'base64') {
        saidaMensagem.value = encodeDecodeBase64();
    }
});