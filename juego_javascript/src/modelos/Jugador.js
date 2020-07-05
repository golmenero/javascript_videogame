class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y);
        this.estado = estados.moviendo;
        this.orientacion = orientaciones.derecha;
        this.vxInteligencia = 4;
        this.vx =  this.vxInteligencia; // velocidadX
        this.vy = 0; // velocidadY
        this.dobleSalto= true;
        this.DISTANCIA_SALTO = -11;
        this.modopUp = false;
        this.enElAire = false;
        this.deslizandose = false;

        // Disparo
        this.cadenciaDisparo = 10;
        this.tiempoDisparo = 0;

        // Animaciones
        // No pasar funciones del DIRECTAMNTE COMO callback
        // El objeto que ejecute la función no sabrá interpretar el "this."
        this.aCorriendoDerecha =
            new Animacion(imagenes.jugador_corriendo_derecha,
                this.ancho, this.alto, 3, 10);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda,
            this.ancho, this.alto, 3, 10);
        this.aCorriendoDerechaPwUp =
            new Animacion(imagenes.jugador_corriendo_derecha_pwup,
                this.ancho, this.alto, 3, 7);
        this.aCorriendoIzquierdaPwUp = new Animacion(imagenes.jugador_corriendo_izquierda_pwup,
            this.ancho, this.alto, 3, 7);
        this.aSaltandoDerecha = new Animacion(imagenes.jugador_saltando_derecha,
            this.ancho, this.alto, 6, 1);
        this.aSaltandoIzquierda = new Animacion( imagenes.jugador_saltando_izquierda,
            this.ancho, this.alto, 6, 1);
        this.aSaltandoDobleDerecha = new Animacion(imagenes.jugador_saltando_doble_derecha,
            this.ancho, this.alto, 6, 8);
        this.aSaltandoDobleIzquierda = new Animacion( imagenes.jugador_saltando_doble_izquierda,
            this.ancho, this.alto, 6, 8);
        this.aDeslizandoseDerecha = new Animacion(imagenes.jugador_delizandose_derecha,
            this.ancho, this.alto, 6, 1);
        this.aDeslizandoseIzquierda = new Animacion( imagenes.jugador_deslizandose_izquierda,
            this.ancho, this.alto, 6, 1);
        this.aMorirDerecha = new Animacion(imagenes.jugador_muriendose_derecha,
            this.ancho, this.alto, 9, 6, this.finAnimacionMorir.bind(this));
        this.aMorirIzquierda = new Animacion(imagenes.jugador_muriendose_izquierda,
            this.ancho, this.alto, 9, 6, this.finAnimacionMorir.bind(this));

        this.animacion = this.aCorriendoDerecha;
        this.vx=4;
    }

    actualizar(){

        console.log(this.estado)
        if (!this.enElAire && this.estado != estados.muriendo) {
            this.decidirEstadoReposo();
        }
        if(this.estado == estados.muriendo){
            this.vx = 0;
        }
       else if (this.vx == 0 || (((this.x + this.ancho/2 + this.vx) >= 480) || ((this.x - this.ancho/2 + this.vx) <= 0))) {
           // SI ESTA EN EL SUELO Y EN LOS BORDES DE LA PANTALLA
           if(this.choqueAbajo && ((this.x + this.ancho/2 + this.vx >= 480) || (this.x - this.ancho/2 + this.vx <= 0))) {
               this.vxInteligencia = this.vxInteligencia * -1;
               this.vx = this.vxInteligencia;
               this.vy = 0;
               this.enElAire = false;
               this.deslizandose = false;
               this.decidirEstadoReposo();
           }
           // SI NO ESTA EN EL SUELO Y EN LOS BORDES DE LA PANTALLA
           else if(!this.choqueAbajo && ((this.x + this.ancho/2 + this.vx >= 475) || (this.x - this.ancho/2 + this.vx <= 10))) {
               this.vx =  0;
               this.vy = 1;
               this.enElAire = true;
               this.deslizandose = true;
               this.estado = estados.deslizandose;
           }
           // SI ESTA EN EL SUELO Y CHOCA CON UN ESTATICO
           else if(((this.choqueDerecha || this.choqueIzquierda) && this.choqueAbajo)){
               this.vxInteligencia = this.vxInteligencia * -1;
               this.vx = this.vxInteligencia;
               this.vy = 0;
               this.enElAire = false;
               this.deslizandose = false;
               this.decidirEstadoReposo();
           }
           // SI NO ESTA EN EL SUELO Y CHOCA CON UN ESTATICO
           else if(((this.choqueDerecha || this.choqueIzquierda) && !this.choqueAbajo)){
               this.vx =  0;
               this.vy = 1;
               this.enElAire = true;
               this.deslizandose = true;
               this.estado = estados.deslizandose;
           }
           else if(this.choqueAbajo && ((this.x + this.ancho/2 + this.vx < 475) || (this.x - this.ancho/2 + this.vx > 10))) {
               this.vx = this.vxInteligencia;
               this.vy = 0;
               this.enElAire = false;
               this.deslizandose = false;
               this.decidirEstadoReposo();
           }
        }
        this.animacion.actualizar();


        // ¿Esta en el aire?
        if (this.choqueAbajo == true){
            this.enElAire = false;
            this.dobleSalto = true;
        }
        // Establecer orientación
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
        }
        // Selección de animación
        switch (this.estado){
            case estados.saltando:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aSaltandoDerecha;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aSaltandoIzquierda;
                }
                break;
            case estados.moviendo:
                if ( this.vx != 0 ) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                break;
            case estados.dobleSalto:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aSaltandoDobleDerecha;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aSaltandoDobleIzquierda;
                }
                break;
            case estados.deslizandose:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aDeslizandoseDerecha;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aDeslizandoseIzquierda;
                }
                break;
            case estados.muriendo:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aMorirDerecha;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aMorirIzquierda;
                }
                break;
            case estados.powerUp:
                if (this.orientacion == orientaciones.derecha){
                    this.animacion = this.aCorriendoDerechaPwUp;
                }
                if (this.orientacion == orientaciones.izquierda){
                    this.animacion = this.aCorriendoIzquierdaPwUp;
                }
                break;


        }


        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }
    }

    disparar(){
        if (this.estado == estados.powerUp) {
            if (this.tiempoDisparo == 0) {
                // reiniciar Cadencia
                this.estado = estados.disparando;
                this.tiempoDisparo = this.cadenciaDisparo;
                var disparo = new DisparoJugador(this.x, this.y);
                if (this.orientacion == orientaciones.izquierda) {
                    disparo.vx = disparo.vx * -1; //invertir
                }
                this.reproducirEfecto(efectos.disparo);
                return disparo;

            } else {
                return null;
            }
        }
    }

    dibujar (scrollY){
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x, this.y - scrollY);
    }

    saltar(){
        // Si se esta deslizando
        if(this.deslizandose && this.enElAire){
            this.vxInteligencia = this.vxInteligencia * -1;
            this.vx = this.vxInteligencia;
            this.vy = this.DISTANCIA_SALTO;
            this.estado = estados.saltando;
            this.dobleSalto = true;
            this.deslizandose = false;
            this.reproducirEfecto(efectos.salto);
        }
        // Si esta en el suelo
        else if (!this.deslizandose && !this.enElAire) {
            this.vy = this.DISTANCIA_SALTO;
            this.estado = estados.saltando;
            this.enElAire = true;
            this.reproducirEfecto(efectos.salto);
        }
        // Doble salto
        else{
            if(this.dobleSalto){
                this.estado = estados.dobleSalto;
                this.vy = this.DISTANCIA_SALTO;
                this.enElAire = true;
                this.dobleSalto = false;
                this.reproducirEfecto(efectos.doble_salto);
            }
        }
}

    rebotaEnemigo() {
        this.vy = -7;
    }

    rebotaJumpPad() {
        this.vy = -15;
    }


    reproducirEfecto( srcEfecto ) {
        var efecto = new Audio( srcEfecto );
        efecto.play();
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }


    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }

    modoPowerUp(){
        this.DISTANCIA_SALTO = -14;
        this.estado = estados.powerUp;
    }

    modoPowerDown(){
        this.DISTANCIA_SALTO = -11;
        this.estado = estados.moviendo;
    }


    decidirEstadoReposo(){
        this.estado = this.modopUp ? estados.powerUp : estados.moviendo;
    }


}
