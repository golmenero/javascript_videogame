class Joya extends Modelo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
            this.animacion = new Animacion(imagenes.joya_animacion,
                this.ancho, this.alto, 6, 8);

        this.vy = 0;
        this.vx = 0;
    }
    actualizar (){
        this.animacion.actualizar();
    }

    dibujar (scrollY){
        this.animacion.dibujar(this.x, this.y- scrollY);
    }

}
