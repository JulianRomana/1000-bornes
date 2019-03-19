import { runMain } from "module";
let images = require('../assets/*.png');
// Different variables

// Player 1 variables 
let hand1 = document.querySelector("#hand1");
let tray1 = document.querySelector("#tray1");
let hand_cards1 = document.querySelectorAll("#hand1 li");
let tray_attack1= document.querySelectorAll("#tray1 figure")[0];
let tray_defense1 = document.querySelectorAll("#tray1 figure")[1];
let tray_bonus1 = document.querySelectorAll("#tray1 figure")[2];
let tray_speed1 = document.querySelectorAll("#tray1 figure")[3];

// Player 2 variables 
let hand2 = document.querySelector("#hand2 ");
let tray2 = document.querySelector("#tray2");
let hand_cards2 = document.querySelectorAll("#hand2 li");
let tray_attack2 = document.querySelectorAll("#tray2 figure")[0];
let tray_defense2 = document.querySelectorAll("#tray2 figure")[1];
let tray_bonus2 = document.querySelectorAll("#tray2 figure")[2];
let tray_speed2 = document.querySelectorAll("#tray2 figure")[3];

let speed = document.querySelector('h2')
let button = document.querySelector("button");

class Card {
  constructor(name, image, occurrence) {
    this.name = name;
    this.image = image;
    this.occurence = occurrence;
  }
}
// All the different  cards
let accident = new Card("accident", images.accident, 3);
let reparation = new Card("reparation", images.reparation, 6);
let citerne = new Card("citerne", images.citerne, 1);
let as_volant = new Card("as_volant", images.as_volant, 1);
let vehicule_prioritaire = new Card("vehicule_prioritaire",images.vehicule_prioritaire,1);
let increvable = new Card("increvable", images.increvable, 1);
let crevé = new Card("crevé", images.creve, 3);
let roue_secours = new Card("roue_secours", images.roue_secours, 6);
let feux_rouge = new Card("feux_rouge", images.feux_rouge, 5);
let feux_vert = new Card("feux_vert", images.feux_vert, 14);
let fin_vitesse = new Card("fin_vitesse", images.fin_vitesse, 6);
let limite_vitesse = new Card("limite_vitesse", images.limite_vitesse, 4);
let v_25 = new Card("25", images.twenty_five, 10);
let v_50 = new Card("50", images.fifty, 10);
let v_75 = new Card("75", images.seventy_five, 10);
let v_100 = new Card("100", images.hundred, 10);
let v_200 = new Card("200", images.two_hundred, 10);
let panne_essence = new Card("panne_essence", images.panne_essence, 3);
let essence = new Card("essence", images.essence, 5);

let cards = [
  accident,
  reparation,
  citerne,
  as_volant,
  vehicule_prioritaire,
  increvable,
  crevé,
  roue_secours,
  feux_rouge,
  feux_vert,
  fin_vitesse,
  limite_vitesse,
  v_25,
  v_50,
  v_75,
  v_100,
  v_200,
  panne_essence,
  essence
];
cards = cards.reduce((memo, item) => {
  for (let i = 0; i < item.occurence; i++) {
    memo.push(item);
  }
  return memo;
}, []);
console.log(cards)
// object for cards


// Object who represents the player
let player1 = {
  hand1: [],
  speed: 0,
  shuffleHand() {
    for (let i = 0; i < hand_cards1.length; i++) {
      let randomNumber = Math.floor(Math.random() * cards.length);
      let randomCard = cards[randomNumber]
      let img = hand_cards1[i].querySelector("img");
      img.setAttribute("src", randomCard.image)
      img.setAttribute("alt", randomCard.name)
      this.hand1.push(randomCard);
      cards.splice(randomNumber, 1);
    }
  }
};

let player2 = {
  hand2: [],
  speed: 0,
  shuffleHand() {
    for (let i = 0; i < hand_cards2.length; i++) {
      let randomNumber = Math.floor(Math.random() * cards.length);
      let randomCard = cards[randomNumber]
      let img = hand_cards2[i].querySelector("img");
      img.setAttribute("src", randomCard.image)
      img.setAttribute("alt", randomCard.name)
      this.hand2.push(randomCard);
      cards.splice(randomNumber, 1);
    }
  }
};


// Beggining of the game
button.addEventListener("click", () => {
  console.log('clicked')
  player1.shuffleHand();
  player2.shuffleHand();
  button.remove();
  hand2.classList.add("animation__hand2")
  hand1.classList.add("animation__hand1")
  setTimeout(function() {
    tray1.className = "tray1"
    tray2.className = "tray2"
  }, 1200);
  console.log(cards)
});




// Adding cards to the tray for player 1
for (let i = 0; i < hand_cards1.length; i++) {
  hand_cards1[i].addEventListener('click', ()=>{
    let innerImage = hand_cards1[i].querySelector('img')
    let attribute = innerImage.getAttribute('alt')
    if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
     if (tray_speed1.children[1]) {
       tray_speed1.children[1].remove()
     }
      tray_speed1.append(innerImage);
      player1.speed = player1.speed + parseInt(attribute)
      speed.innerHTML = `votre score: ` + player1.speed
      console.log('Player 1 speed: ' + player1.speed)
   }else if(attribute === "increvable" || attribute ===  "vehicule_prioritaire" || attribute ===  "as_volant" || attribute ===  "citerne"){
      tray_bonus1.append(innerImage)
   }else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
    tray_attack2.append(innerImage)
   } else if(attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours" ) {
    tray_defense1.append(innerImage)
   }
  })
}
// Adding cards to the tray for player  2
for (let i = 0; i < hand_cards2.length; i++) {
  hand_cards2[i].addEventListener('click', ()=>{
    let innerImage = hand_cards2[i].querySelector('img')
    let attribute = innerImage.getAttribute('alt')
    if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
     if (tray_speed2.children[1]) {
       tray_speed2.children[1].remove()
     }
      tray_speed2.append(innerImage);
      player2.speed = player2.speed + parseInt(attribute)
      speed.innerHTML = `votre score: ` + player2.speed
      console.log('Player 2 speed: ' + player2.speed)
   }else if(attribute === "increvable" || attribute ===  "vehicule_prioritaire" || attribute ===  "as_volant" || attribute ===  "citerne"){
      tray_bonus2.append(innerImage)
   }else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
    tray_attack1.append(innerImage)
   } else if(attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours" ) {
    tray_defense2.append(innerImage)
   }
  })
}




/* // RIP DRAG AND DROP
let movingImage = new Image();
console.log(movingImage);
for (let i = 0; i < hand_cards.length; i++) {
  hand_cards[i].addEventListener("dragstart", (e) => {
    movingImage.src = `${player1.hand2[i].image}`;
    e.dataTransfer.setDragImage(movingImage, 80, 80);
    console.log(movingImage)
    // Supprime le carte du deck quand elle a été déposée
    hand_cards[i].addEventListener('dragend', (e)=> {
      hand_cards[i].removeChild(hand_cards[i].childNodes[0])
    })
})
// Drop zone 
}                                           
for (let i = 0; i < tray_cards.length; i++) {
  let  target = tray_cards[i]
  // Quand l'image du drag passe sur les différents li du plateau
  target.addEventListener('dragover', (e)=>{
    e.preventDefault()
    target.appendChild(movingImage)
    console.log(movingImage)
  })
  target.addEventListener('dragleave', ()=> {
    let innerImage = target.querySelector('img')
    // target.removeChild(innerImage)
  })
  target.addEventListener('dragenter', ()=> {
  })
  target.addEventListener('drop', ()=>{
    console.log('element déposé')
  })
}
 */
