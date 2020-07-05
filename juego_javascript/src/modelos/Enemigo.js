class Enemigo extends Modelo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
        this.estado = estados.moviendo;
        this.vxInteligencia = -1;
        this.vx = this.vxInteligencia;
            this.aMover = new Animacion(imagenes.enemigo_aplastable_correr,
                this.ancho, this.alto, 6, 3);
            this.aMorir = new Animacion(imagenes.enemigo_aplastable_morir,
                this.ancho, this.alto, 6, 8, this.finAnimacionMorir.bind(this));
        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 1;
    }

    actualizar (){
        this.animacion.actualizar();

        switch (this.estado){
            case estados.moviendo:
                this.animacion = this.aMover;
                break;
            case estados.muriendo:
                this.animacion = this.aMorir;
                break;
        }

        if ( this.estado == estados.muriendo) {
            this.vx = 0;
        } else {
            if (this.vx == 0) {
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }

            if (this.fueraPorDerecha ){
                // mover hacia la izquierda vx tiene que ser negativa
                if ( this.vxInteligencia > 0){
                    this.vxInteligencia = this.vxInteligencia * -1;
                }
                this.vx = this.vxInteligencia;
            }
            if (this.fueraPorIzquierda ){
                // mover hacia la derecha vx tiene que ser positiva
                if ( this.vxInteligencia < 0){
                    this.vxInteligencia = this.vxInteligencia * -1;
                }
                this.vx = this.vxInteligencia;
            }
            if((this.x + this.ancho/2 + this.vx > 470) || (this.x - this.ancho/2 + this.vx < 10)){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }



        }

    }

    dibujar (scrollY){
        this.animacion.dibujar(this.x, this.y- scrollY);
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }


}
