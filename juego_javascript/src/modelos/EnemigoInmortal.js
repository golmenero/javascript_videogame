class EnemigoInmortal extends Enemigo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
        this.aMoverDerecha = new Animacion(imagenes.enemigo_inmortal_correr_derecha,
            this.ancho, this.alto, 10, 2);
        this.aMoverIzquierda = new Animacion(imagenes.enemigo_inmortal_correr_izquierda,
            this.ancho, this.alto, 10, 2);

        this.orientacion = orientaciones.derecha;
        // Ref a la animación actual
        this.animacion = this.aMoverDerecha;

        this.vy = 0;
        this.vx = 1;
    }

    actualizar (){
        this.animacion.actualizar();

        switch (this.orientacion){
            case orientaciones.izquierda:
                this.animacion = this.aMoverIzquierda;
                break;
            case orientaciones.derecha:
                this.animacion = this.aMoverDerecha;
                break;
        }

        if (this.vx == 0) {
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
        }
        if ( this.vx > 0 ){
            this.orientacion = orientaciones.derecha;
        }
        if ( this.vx < 0 ){
            this.orientacion = orientaciones.izquierda;
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
