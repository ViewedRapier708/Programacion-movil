const btnVerificar = document.getElementById("button-verificacion");
const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F',
                'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S',
                'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

btnVerificar.addEventListener("click", () => {
  validacionDNI();
});

function validacionDNI() {
  const numDNI = document.getElementById("text-numeroDNI").value.trim();
  const letraDNI = document.getElementById("text-letraDNI").value.trim().toUpperCase();
  const resultado = document.getElementById("resultado");

  if (numDNI === "" || letraDNI === "" || isNaN(numDNI)) {
    resultado.textContent = "Verifique la entrada.";
    resultado.style.color = "red";
    return;
  }

  if (Number(numDNI) < 0 || Number(numDNI) > 99999999) {
    resultado.textContent = "Número de DNI fuera de rango.";
    resultado.style.color = "red";
    return;
  }

  const letraCalculada = letras[Number(numDNI) % 23];

  if (letraDNI === letraCalculada) {
    resultado.textContent = "El DNI y la letra son correctos.";
    resultado.style.color = "green";
  } else {
    resultado.textContent = "La letra indicada no es correcta. Debería ser: " + letraCalculada;
    resultado.style.color = "red";
  }
}
