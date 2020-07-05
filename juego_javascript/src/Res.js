var cache = [];
// Lista re recursos a precargar
var imagenes = {
    jugador : "res/kirby.png",
    disparo_jugador : "res/disparo_jugador.png",
    icono_puntos : "res/icono_recolectable_moneda.png",
    fondo_2 : "res/fondo_2.jpg",
    jugador_corriendo_derecha : "res/kirby_camina_derecha.png",
    jugador_corriendo_izquierda : "res/kirby_camina_izquierda.png",
    jugador_saltando_derecha : "res/kirby_salta_derecha.png",
    jugador_saltando_izquierda : "res/kirby_salta_izquierda.png",
    jugador_saltando_doble_derecha : "res/kirby_salta_doble_derecha.png",
    jugador_saltando_doble_izquierda : "res/kirby_salta_doble_izquierda.png",
    jugador_delizandose_derecha : "res/kirby_deslizandose_derecha.png",
    jugador_deslizandose_izquierda : "res/kirby_deslizandose_izquierda.png",
    jugador_muriendose_derecha: "res/kirby_muere_derecha.png",
    jugador_muriendose_izquierda: "res/kirby_muere_izquierda.png",
    jugador_corriendo_derecha_pwup: "res/kirby_camina_derecha_pwup.png",
    jugador_corriendo_izquierda_pwup: "res/kirby_camina_izquierda_pwup.png",
    jugador_disparando_derecha: "res/kirby_dispara_derecha.png",
    jugador_disparando_izquierda: "res/kirby_dispara_izquierda.png",
    bloque_tierra : "res/bloque_tierra.png",
    joya : "res/joya.png",
    joya_animacion : "res/joya_anim.png",
    pad :"res/pad.png",
    boton_disparo : "res/boton_disparo.png",
    boton_salto : "res/boton_salto.png",
    boton_pausa : "res/boton_pausa.png",
    menu : "res/menu.png",
    boton_jugar : "res/boton_jugar.png",
    enemigo_aplastable: "res/goomba.png",
    enemigo_aplastable_correr: "res/goomba_movimiento.png",
    enemigo_aplastable_morir: "res/goomba_muerte.png",
    enemigo_inmortal: "res/shell.png",
    enemigo_inmortal_correr_derecha: "res/enemigo_inmortal_mover_derecha.png",
    enemigo_inmortal_correr_izquierda: "res/enemigo_inmortal_mover_izquierda.png",
    enemigo_volador: "res/enemigo_volador.png",
    enemigo_volador_derecha: "res/enemigo_volador_derecha.png",
    enemigo_volador_izquierda: "res/enemigo_volador_izquierda.png",
    enemigo_volador_muerte: "res/enemigo_volador_muerte.png",
    recolectable_moneda_animacion: "res/recolectable_moneda_anim.png",
    recolectable_moneda: "res/recolectable_moneda.png",
    jump_pad: "res/jump_pad.png",
    mensaje_ganar: "res/boton_victoria.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    cache[rutasImagenes[indice]]= new Image();
    cache[rutasImagenes[indice]].src= rutasImagenes[indice];
    cache[rutasImagenes[indice]].onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
