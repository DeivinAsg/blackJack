//cargamos las cartas en un arreglo

//VARIABLES 

let puntosJugador = 0;
let puntosRival = 0;

//manejo del dom 

const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnPlantarse = document.querySelector('#btnPlantarse')
const puntosHTML = document.querySelectorAll("small")
const cartasJugador = document.querySelector("#cartasJugador")
const cartasRival = document.querySelector('#cartasRival')
const baraja = [
    '2C',
    '2D',
    '2H',
    '2S',
    '3C',
    '3D',
    '3H',
    '3S',
    '4C',
    '4D',
    '4H',
    '4S',
    '5C',
    '5D',
    '5H',
    '5S',
    '6C',
    '6D',
    '6H',
    '6S',
    '7C',
    '7D',
    '7H',
    '7S',
    '8C',
    '8D',
    '8H',
    '8S',
    '9C',
    '9D',
    '9H',
    '9S',
    '10C',
    '10D',
    '10H',
    '10S',
    'AC',
    'AD',
    'AH',
    'AS',
    'JC',
    'JD',
    'JH',
    'JS',
    'KC',
    'KD',
    'KH',
    'KS',
    'QC',
    'QD',
    'QH',
    'QS',
];

//console.log(baraja);

//=====================================funciones basicas del juego==========================================//

//HACER LA FUNCION QUE MEZCLE LA BARAJA 

const mezclar = ()=>{
    baraja.sort(()=>Math.random()-0.5);
    //console.log(baraja);
    return baraja;
}
mezclar();

//hacer la funcion que pida la carta

const Pedir = ()=>{
    if(baraja.length===0){
        throw('no existen mas cartas en la baraja')
    }
    const carta = baraja.pop();
    return carta;
}
Pedir();


// Funcion que obtiene el valor de la carta 

const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length-1);
    let puntos = 0;
    if(isNaN(valor)){
        puntos = valor =="A"? 11 : 10;
    }else{
        puntos = valor * 1;
    }
    return puntos;
}

const jugarRival = (puntosMinimos)=>{
    do {
        const carta = Pedir()
        puntosRival = puntosRival+valorCarta(carta);
        puntosHTML[1].innerText = puntosRival;
        const imgCarta = document.createElement("img");
        imgCarta.src=`assets/img/${carta}.png`;
        imgCarta.classList.add('carta')
        cartasRival.append(imgCarta);
       
       

    } while (puntosRival<puntosMinimos && puntosMinimos <= 21);

    setTimeout(()=>{
        if(puntosRival === puntosMinimos){
            alert("nadie gana");
        }else if(puntosMinimos>21){
            alert("Rival gana");
        }else if(puntosRival>21){
            alert("Jugador gana");
        }else{
            alert("Rival gana")
        }

    },100)

    
};






















//====================================eventos del juego===========================================\\

//evento juego nuevo
btnNuevo.addEventListener('click',()=>{
    //alert("diste click en nuevo juego")
    console.clear();
    mezclar();
    puntosJugador=0;
    puntosRival=0;
    puntosHTML[0].innerText=0;
    puntosHTML[1].innerText=0;
    cartasJugador.innerHTML="";
    cartasRival.innerHTML="";
    btnPedir.disabled=false;
    btnPlantarse.disabled=false;
})
//evento pedir 
btnPedir.addEventListener('click',()=>{
    //alert("diste click en pedir siguiente carta")
    const carta = Pedir();
    //AUMENTAR EL VALOR DE LA CARTA EN EL CONTADOR DEL JUGADOR
    puntosJugador = puntosJugador+valorCarta(carta);
    console.log(carta);
    console.log(puntosJugador);
    puntosHTML[0].innerHTML=puntosJugador;
//mostramos las cartas del jugador correspondiente 
    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/img/${carta}.png`;
    imgCarta.classList.add("carta");
    cartasJugador.append(imgCarta);
    //validamos los puntos acumulados 
    if(puntosJugador>21){
        console.warn('lo siento excediste los puntos limites (21)')
        btnPedir.disabled=true;
        btnPlantarse.disabled=true;
        jugarRival(puntosJugador)
    }else if(puntosJugador===21){
        console.warn('excelente tienes mucha suerte')
        btnPedir.disabled=true;
        btnPlantarse.disabled=true;
        jugarRival(puntosJugador);
    }
})

   
    
//evento plantarse
btnPlantarse.addEventListener('click',()=>{
    //alert("diste click en plantarse")
    btnPedir.disabled=true;
    btnPlantarse.disabled=true;
    jugarRival(puntosJugador);
    

})