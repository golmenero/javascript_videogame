class Texto {

    constructor(valor, x, y) {
        this.valor = valor;
        this.x = x;
        this.y = y;
    }

    dibujar (){
        contexto.font = "25px Candara";
        contexto.fillStyle = "black";
        contexto.textAlign = "left";
        contexto.fillText(this.valor,this.x,this.y);
    }

}
