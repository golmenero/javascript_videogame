class JumpPad extends Modelo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
        this.animacion = new Animacion(imagenes.jump_pad,
            this.ancho, this.alto, 6, 1);

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
