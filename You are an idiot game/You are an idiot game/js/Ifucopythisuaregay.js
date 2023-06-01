// Iniciar las variables
let tarjetasdestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerresultado = null;
let segundoresultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerinicial = 60;
let tiemporegresivoid = null;
let intentos = 3;

// Apuntando al HTML
let mostrarmovimientos = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo = document.getElementById('timerestante');
let mostrarintentos = document.getElementById('intentos');

// Código para la generación de números aleatorios
let imagenes = [
  'img/Face1.png',
  'img/Face1.png',
  'img/Face2.png',
  'img/Face2.png',
  'img/Face3.png',
  'img/Face3.png',
  'img/Face4.png',
  'img/Face4.png',
  'img/Face5.png',
  'img/Face5.png',
  'img/Face6.png',
  'img/Face6.png',
  'img/Face7.png',
  'img/Face7.png',
  'img/Face8.png',
  'img/Face8.png'
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

imagenes = shuffleArray(imagenes);

function contratiempo() {
  tiemporegresivoid = setInterval(() => {
    timer--;
    mostrartiempo.innerHTML = `Left time!¿?: ${timer} seconds`;
    if (timer == 0) {
      clearInterval(tiemporegresivoid);
      bloqueartarjetas();
      alert("Se acabó el tiempo. ¡Perdiste!");
    }
  }, 1000);
}

function bloqueartarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetabloqueada = document.getElementById(i);
    tarjetabloqueada.disabled = true;
  }
}

// Función principal para destapar
function destapar(id) {
  if (temporizador == false) {
    contratiempo();
    temporizador = true;
  }

  tarjetasdestapadas++;

  if (tarjetasdestapadas == 1) {
    tarjeta1 = document.getElementById(id);
    primerresultado = imagenes[id];
    tarjeta1.style.backgroundImage = `url('${primerresultado}')`;
    tarjeta1.disabled = true;
  } else if (tarjetasdestapadas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoresultado = imagenes[id];
    tarjeta2.style.backgroundImage = `url('${segundoresultado}')`;
    tarjeta2.disabled = true;

    movimientos++;
    mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerresultado == segundoresultado) {
      tarjetasdestapadas = 0;
      aciertos++;
      mostraraciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiemporegresivoid);
        mostraraciertos.innerHTML = `Aciertos: ${aciertos}. ¡Eres un ganador!`;
        mostrartiempo.innerHTML = `Tiempo utilizado: ${timerinicial - timer} segundos`;
        mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;
        alert("¡Felicidades! ¡Ganaste!");
      }
    } else {
      setTimeout(() => {
        tarjeta1.style.backgroundImage = '';
        tarjeta2.style.backgroundImage = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjetasdestapadas = 0;

        intentos--;
        mostrarintentos.innerHTML = `Intentos restantes: ${intentos}`;

        if (intentos === 0) {
          clearInterval(tiemporegresivoid);
          mostraraciertos.innerHTML = `Aciertos: ${aciertos}. ¡Perdiste!`;
          mostrartiempo.innerHTML = `Tiempo utilizado: ${timerinicial - timer} segundos`;
          mostrarmovimientos.innerHTML = `Movimientos: ${movimientos}`;
          bloqueartarjetas();
          alert("Se acabaron los intentos. ¡Perdiste!");
        }
      }, 800);
    }
  }
}

