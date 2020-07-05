var musicaAmbiente = new Audio("res/musica_ambiente.mp3");
musicaAmbiente.loop = true;

var efectos = {
    salto : "res/efecto_salto.mp3",
    doble_salto : "res/efecto_salto_doble.mp3",
    golpe : "res/efecto_golpe.mp3",
    explosion : "res/efecto_explosion.mp3",
    disparo : "res/efecto_disparo.mp3",
    salto_jp : "res/efecto_salto_jp.mp3"
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}
