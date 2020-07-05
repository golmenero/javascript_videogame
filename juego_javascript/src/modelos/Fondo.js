class Fondo extends Modelo {

    constructor(rutaImagen, x, y) {
        super(rutaImagen, x, y);
        this.vx = 0;
    }

    actualizar(){
    }

    dibujar(){
        super.dibujar();

        if ( this.fondoAux != null ) {
            // hueco por la izquierda
            if ( this.x - this.ancho/2 > 0){
                // pintar auxiliar por la izquierda
                this.fondoAux.x = this.x - this.ancho;
            }
            // hueco por la derecha
            if (this.x + this.ancho/2 < 480){
                // pintar auxiliar por la derecha
                this.fondoAux.x =this.x + this.ancho;
            }
            this.fondoAux.dibujar();
        }
    }



}
