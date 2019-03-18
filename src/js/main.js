import { runMain } from "module";
// Different variables
let hand = document.querySelector("#hand");
let tray = document.querySelector("#tray");
let speed = document.querySelector('h2')
let hand_cards = document.querySelectorAll("#hand li");
let tray_attack = document.querySelectorAll("#tray figure")[0];
let tray_defense = document.querySelectorAll("#tray figure")[1];
let tray_bonus = document.querySelectorAll("#tray figure")[2];
let tray_speed= document.querySelectorAll("#tray figure")[3];
let button = document.querySelector("button");

// object for cards
class Card {
  constructor(name, image, occurrence) {
    this.name = name;
    this.image = image;
    this.occurence = occurrence;
  }
}

// Object who represents the player
let player = {
  hand: [],
  speed: 0,
  shuffleHand() {
    for (let i = 0; i < hand_cards.length; i++) {
      const li = hand_cards[i];
      let randomNumber = Math.floor(Math.random() * cards.length);
      let randomCard = cards[randomNumber]
      let img = li.querySelector("img");
      img.setAttribute("src", randomCard.image)
      img.setAttribute("alt", randomCard.name)
      this.hand.push(randomCard);
      cards.splice(randomNumber, 1);
    }
  }
};
let images = require('../assets/*.png');
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

// Beggining of the game
button.addEventListener("click", () => {
  player.shuffleHand();
  button.remove();
  hand.classList.add("animation")
  setTimeout(function() {
    tray.className = "tray"
    hand.classList.remove("animation")
  }, 1200);
});

// Adding images to the tray
for (let i = 0; i < hand_cards.length; i++) {
  let cards = hand_cards[i];
  cards.addEventListener('click', ()=>{
    let innerImage = cards.querySelector('img')
    let attribute = innerImage.getAttribute('alt')
    if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
     if (tray_speed.children[1]) {
       tray_speed.children[1].remove()
     }
      tray_speed.append(innerImage);
      player.speed = player.speed + parseInt(attribute)
      speed.innerHTML = `votre score: ` + player.speed
      console.log(player.speed)
   }else if(attribute === "increvable" || attribute ===  "vehicule_prioritaire" || attribute ===  "as_volant" || attribute ===  "citerne"){
      tray_bonus.append(innerImage)
   }else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
    tray_attack.append(innerImage)
   } else if(attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours" ) {
    tray_defense.append(innerImage)
   }
  })
}
  













/* // RIP DRAG AND DROP
let movingImage = new Image();
console.log(movingImage);
for (let i = 0; i < hand_cards.length; i++) {
  hand_cards[i].addEventListener("dragstart", (e) => {
    movingImage.src = `${player.hand[i].image}`;
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
