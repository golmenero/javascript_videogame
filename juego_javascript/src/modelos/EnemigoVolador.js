class EnemigoVolador extends Enemigo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
        this.aMoverDerecha = new Animacion(imagenes.enemigo_volador_derecha,
            this.ancho, this.alto, 6, 6);
        this.aMoverIzquierda = new Animacion(imagenes.enemigo_volador_izquierda,
            this.ancho, this.alto, 6, 6);
        this.aMuerte = new Animacion(imagenes.enemigo_volador_muerte, this.alto, this.ancho, 6,16,this.finAnimacionMorir.bind(this))

        // Ref a la animación actual
        this.animacion = this.aMoverDerecha;
        this.orientacion = orientaciones.derecha;

        this.xMax = x + 250;
        this.xMin = x - 250;
        this.yMax = y + 20;
        this.yMin = y - 20;

        if(this.xMax > 455){
            this.xMax = 455;
        }
        if(this.xMin < 20){
            this.xMin = 20;
        }


        this.vy = -1;
        this.vx = 1;
    }

    actualizar (){
        this.animacion.actualizar();

        switch (this.orientacion){
            case orientaciones.derecha:
                this.animacion = this.aMoverDerecha;
                break;
            case orientaciones.izquierda:
                this.animacion = this.aMoverIzquierda;
                break;
        }

        switch (this.estado){
            case estados.muriendo:
                this.animacion = this.aMuerte;
                break;
        }

        if ( this.estado == estados.muriendo) {
            this.vx = 0;
            this.vy = 0;
        } else {
            if (this.vx == 0) {
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
            if (this.vx > 0) {
                this.orientacion = orientaciones.derecha;
            }
            if (this.vx < 0) {
                this.orientacion = orientaciones.izquierda;
            }
            if((this.x + this.ancho/2 + this.vx > 470) || (this.x - this.ancho/2 + this.vx < 10)){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }

            // Si se va a pasar por los lados invertimos la velocidad horizontal
            if((this.x + this.vx +  this.ancho/2) > this.xMax || (this.x - this.ancho/2 + this.vx < this.xMin) ){
                this.vxInteligencia = this.vxInteligencia * -1;
                this.vx = this.vxInteligencia;
            }
            // Si se va a pasar por arriba invertimos la velocidad vertical
            if((this.y + this.vy) > this.yMax || (this.y + this.vy) < this.yMin || this.choqueAbajo || this.choqueArriba){
                this.vy = this.vy * -1;
            }
        }


    }

}
