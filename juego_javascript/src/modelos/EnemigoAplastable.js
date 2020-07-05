class EnemigoAplastable extends Enemigo {

    constructor(imagen,x, y) {
        super(imagen, x, y);
        this.aMover = new Animacion(imagenes.enemigo_aplastable_correr,
            this.ancho, this.alto, 10, 2);

        this.aMorir = new Animacion(imagenes.enemigo_aplastable_morir,
            this.ancho, this.alto, 2, 1, this.finAnimacionMorir.bind(this));
        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vy = 0;
        this.vx = 1;
    }
}
