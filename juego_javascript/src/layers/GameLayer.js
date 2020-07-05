class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        //this.reproducirMusica();
        this.espacio = new Espacio(1);

        this.scrollY = 0;
        this.teclaSpace = false;
        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.enemigos = [];

        this.bloques = [];
        this.recolectables = [];
        this.plataformas = [];
        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);


        this.disparosJugador = []
        this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        this.nIteraciones = 0;

        this.cargarMapa("res/" + nivelActual + ".txt");
    }


    actualizar() {
        if (this.pausa) {
            return;
        }

        if (this.joya.colisiona(this.jugador)) {
            nivelActual++;
            if(nivelActual >= nivelMaximo) {
                this.pausa = true;
                this.mensaje =
                    new Boton(imagenes.mensaje_ganar, 0,0);
                nivelActual = 0;
            }
            this.iniciar();
        }

        // Iniciar el juego si el jugador muere
        if(this.jugador.estado == estados.muerto){
            this.iniciar();
        }

        this.espacio.actualizar();
        this.fondo.vx = -1;
        this.fondo.actualizar();
        this.jugador.actualizar();
        this.joya.actualizar();

        for (var i = 0; i < this.recolectables.length; i++) {
            this.recolectables[i].actualizar();
        }

        for (var i = 0; i < this.plataformas.length; i++) {
            this.plataformas[i].actualizar();
        }

        // Eliminar disparos sin velocidad
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }

        // Eliminar disparos fuera de pantalla
        for (var i = 0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()) {
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }


        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }

        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                if (this.enemigos[i] instanceof EnemigoInmortal) {
                    this.jugador.impactado();
                }

                // Colisiones con enemigos que se pueden eliminar saltando sobre ellos
                if ((this.jugador.y + this.jugador.alto/2) < (this.enemigos[i].y - this.enemigos[i].alto / 4)) {
                    if (this.enemigos[i] instanceof EnemigoAplastable) {
                        if (this.enemigos[i].estado != estados.muriendo) {
                            this.puntos.valor++;
                            this.enemigos[i].impactado();
                            this.jugador.estado = estados.saltando;
                            this.jugador.dobleSalto = true;
                            this.jugador.reproducirEfecto(efectos.golpe);
                            this.jugador.rebotaEnemigo();
                        }
                    }
                    if (this.enemigos[i] instanceof EnemigoVolador) {
                        if (this.enemigos[i].estado != estados.muriendo) {
                            this.puntos.valor++;
                            this.enemigos[i].impactado();
                            this.jugador.estado = estados.saltando;
                            this.jugador.dobleSalto = true;
                            this.jugador.reproducirEfecto(efectos.explosion);
                            this.jugador.rebotaEnemigo();
                        }
                    }

                } else {
                    if (this.enemigos[i].estado != estados.muriendo) {
                        this.jugador.impactado();
                    }
                }
            }
        }

        // colisionees jugador- recolectable
        for (var i = 0; i < this.recolectables.length; i++) {
            if (this.jugador.colisiona(this.recolectables[i])) {
                if(this.puntos.valor < 10) {
                    this.puntos.valor++;
                }
                this.recolectables.splice(i, 1);
            }
        }

        // colisionees jugador- jumpPad
        for (var i = 0; i < this.plataformas.length; i++) {
            if (this.jugador.colisiona(this.plataformas[i]) && this.jugador.estado != estados.muriendo) {
                if (this.jugador.y < (this.plataformas[i].y - this.plataformas[i].alto / 4)) {
                    this.jugador.reproducirEfecto(efectos.salto_jp);
                    this.jugador.rebotaJumpPad();
                }
            }
        }

        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {

                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j]) &&
                    !this.enemigos[j].esAplastable) {
                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    if (this.enemigos[j].estado != estados.muriendo) {
                        this.puntos.valor++;
                    }
                    this.enemigos[j].impactado();
                }
            }
        }


        // Enemigos muertos fuera del juego
        for (var j = 0; j < this.enemigos.length; j++) {
            if (this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);
                this.enemigos.splice(j, 1);

            }
        }

        if(this.puntos.valor == 10) {
            this.jugador.modopUp = true;
            this.puntos.valor = 0;
        }

        if (this.jugador.modopUp) {
            if(this.nIteraciones < 400) {
                this.jugador.modopUp= true;
                this.jugador.modoPowerUp();
                this.nIteraciones++;
            }
            else {
                this.nIteraciones= 0;
                this.jugador.modopUp = false;
                this.jugador.modoPowerDown();
            }
        }
    }

    dibujar() {
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar(this.scrollY);
        }

        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollY);
        }

        this.joya.dibujar(this.scrollY);
        this.jugador.dibujar(this.scrollY);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollY);
        }
        for (var i = 0; i < this.recolectables.length; i++) {
            this.recolectables[i].dibujar(this.scrollY);
        }
        for (var i = 0; i < this.plataformas.length; i++) {
            this.plataformas[i].dibujar(this.scrollY);
        }
        this.fondoPuntos.dibujar();
        this.puntos.dibujar();

        if (this.pausa) {
            this.mensaje.dibujar();
        }
    }


    procesarControles() {
        if (controles.continuar) {
            controles.continuar = false;
            this.pausa = false;
        }

        if(this.jugador.estado != estados.muriendo){
        // disparar
        if (controles.disparo) {
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }


        }

        // Eje Y
        if (controles.moverY > 0) {
            if (this.teclaSpace == true) {
                this.teclaSpace = false;
                this.jugador.saltar();

            }
        } else {
            this.teclaSpace = true;
        }}
    }

    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 40;
            this.altoMapa = (lineas.length) * 40;
            for (var i = 0; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y) {
        switch (simbolo) {
            case "G":
                var enemigoAplastable = new EnemigoAplastable(imagenes.enemigo_aplastable, x, y);
                enemigoAplastable.y = enemigoAplastable.y - enemigoAplastable.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigoAplastable);
                this.espacio.agregarCuerpoDinamico(enemigoAplastable)
                break;
            case "P":
                var enemigoVolador = new EnemigoVolador(imagenes.enemigo_volador, x, y);
                enemigoVolador.y = enemigoVolador.y - enemigoVolador.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigoVolador);
                this.espacio.agregarCuerpoDinamico(enemigoVolador)
                break;
            case "S":
                var enemigoShell = new EnemigoInmortal(imagenes.enemigo_inmortal, x, y);
                enemigoShell.y = enemigoShell.y - enemigoShell.alto / 2;
                this.enemigos.push(enemigoShell);
                this.espacio.agregarCuerpoDinamico(enemigoShell)
                break;
            case "R":
                var recolectable = new Recolectable(imagenes.recolectable_moneda, x, y);
                recolectable.y = recolectable.y - recolectable.alto / 2;
                this.recolectables.push(recolectable);
                this.espacio.agregarCuerpoDinamico(recolectable)
                break;
            case "J":
                this.joya = new Joya(imagenes.joya, x, y,);
                this.joya.y = this.joya.y - this.joya.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.joya);
                break;
            case "1":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "X":
                var jumpPad = new JumpPad(imagenes.jump_pad, x, y);
                jumpPad.y = jumpPad.y - jumpPad.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.plataformas.push(jumpPad);
                this.espacio.agregarCuerpoDinamico(jumpPad);
                break;
        }
    }

    calcularScroll() {
        // limite arriba
        if (this.jugador.y > 320 * 0.3) {
            if (this.jugador.y - this.scrollY < 320 * 0.3) {
                this.scrollY = this.jugador.y - 320 * 0.3;
            }
        }

        // limite abajo
        if (this.jugador.y < this.altoMapa - 320 * 0.4) {
            if (this.jugador.y - this.scrollY > 320 * 0.9) {
                this.scrollY = this.jugador.y - 320 * 0.9;
            }
        }
    }

    reproducirMusica() {
        musicaAmbiente.play();
    }


}
