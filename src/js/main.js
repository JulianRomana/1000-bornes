import { runMain } from "module";
import { notStrictEqual } from "assert";
let images = require("../assets/*.png");
// Different variables

// Player 1 variables
let hand1 = document.querySelector("#hand1");
let tray1 = document.querySelector("#tray1");
let handCards1 = document.querySelectorAll("#hand1 li");
let trayAttack1 = document.querySelectorAll("#tray1 figure")[0];
let trayDefense1 = document.querySelectorAll("#tray1 figure")[1];
let trayBonus1 = document.querySelectorAll("#tray1 figure")[2];
let traySpeed1 = document.querySelectorAll("#tray1 figure")[3];

// Player 2 variables
let hand2 = document.querySelector("#hand2 ");
let tray2 = document.querySelector("#tray2");
let handCards2 = document.querySelectorAll("#hand2 li");
let trayAttack2 = document.querySelectorAll("#tray2 figure")[0];
let trayDefense2 = document.querySelectorAll("#tray2 figure")[1];
let trayBonus2 = document.querySelectorAll("#tray2 figure")[2];
let traySpeed2 = document.querySelectorAll("#tray2 figure")[3];

let speed1 = document.querySelectorAll("span")[0];
let speed2 = document.querySelectorAll("span")[1];

let shuffleButton = document.querySelector("#shuffleButton");
let drawCardButton = document.querySelector("#deck__button");
let countingRemoves = false;
let handLength = 8;
// object to create the cards
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
let vehicule_prioritaire = new Card("vehicule_prioritaire", images.vehicule_prioritaire, 1);
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

// Array with all the cards
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

// Object who represents the player 1
let player1 = {
  hand1: [],
  speed: 0,
  shuffleHand() {
    for (let i = 0; i < handCards1.length; i++) {
      randomCards(this.hand1, handCards1[i]);
    }
  }
};

// Object who represents the player 2
let player2 = {
  hand2: [],
  speed: 0,
  shuffleHand() {
    for (let i = 0; i < handCards2.length; i++) {
      randomCards(this.hand2, handCards2[i]);
    }
  }
};

// Beggining of the game
shuffleButton.addEventListener("click", () => {
  player1.shuffleHand();
  player2.shuffleHand();
  shuffleButton.remove();
  hand2.classList.add("animation__hand2");
  hand1.classList.add("animation__hand1");
  drawCardButton.removeAttribute("disabled");
  setTimeout(function() {
    tray1.className = "tray1";
    tray2.className = "tray2";
  }, 1200);
});

// Adding cards to the tray for player 1

for (let i = 0; i < handCards1.length; i++) {
  handCards1[i].addEventListener("click", () => {
    let innerImage = handCards1[i].querySelector("img");
    let attribute = innerImage.getAttribute("alt");
    if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
      if (traySpeed1.children[1]) {
        traySpeed1.children[1].remove();
      }
      traySpeed1.append(innerImage);
      player1.speed = player1.speed + parseInt(attribute);
      speed1.innerHTML = `votre score: ` + player1.speed;
    } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
      trayBonus1.append(innerImage);
    } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
      trayAttack2.append(innerImage);
    } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
      trayDefense1.append(innerImage);
    }
  });
}

// Adding cards to the tray for player  2

handCards2 = document.querySelectorAll("#hand2 li");
for (let i = 0; i < handCards2.length; i++) {
  handCards2[i].addEventListener("click", () => {
    if (!countingRemoves) {
      countingRemoves = true;
    }
    if (handLength > 7) {
      let innerImage = handCards2[i].querySelector("img");
      let attribute = innerImage.getAttribute("alt");
      if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
        if (traySpeed2.children[1]) {
          traySpeed2.children[1].remove();
        }
        traySpeed2.append(innerImage);
        player2.speed = player2.speed + parseInt(attribute);
        speed2.innerHTML = `votre score: ` + player2.speed;
      } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
        trayBonus2.append(innerImage);
      } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
        trayAttack1.append(innerImage);
      } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
        trayDefense2.append(innerImage);
      }
      handLength--;
      handCards2[i].remove();
    } else {
      alert("Pas plus d'une carte par tours ! ");
    }
  });
}
// Pushing random cards to the player's hand
let randomCards = (hand, hand_cards) => {
  let randomNumber = Math.floor(Math.random() * cards.length);
  let randomCard = cards[randomNumber];
  let img = hand_cards.querySelector("img");
  img.setAttribute("src", randomCard.image);
  img.setAttribute("alt", randomCard.name);
  hand.push(randomCard);
  cards.splice(randomNumber, 1);
};

// To draw a card
drawCardButton.addEventListener("click", () => {
  if (countingRemoves) {
    let randomNumber = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNumber];
    let newLi = document.createElement("li");
    let newCard = document.createElement("img");
    newCard.setAttribute("src", randomCard.image);
    newCard.setAttribute("alt", randomCard.name);
    newLi.appendChild(newCard);
    player2.hand2.push(randomCard);
    hand2.appendChild(newLi);
    cards.splice(randomNumber, 1);
    countingRemoves = false;
    handLength++;
    newLi.addEventListener("click", () => {
      let image = newLi.querySelector("img");
      let attribute = image.getAttribute("alt");
      if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
        if (traySpeed2.children[1]) {
          traySpeed2.children[1].remove();
        }
        traySpeed2.append(image);
        player2.speed = player2.speed + parseInt(attribute);
        speed2.innerHTML = `votre score: ` + player2.speed;
      } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
        trayBonus2.append(image);
      } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
        trayAttack1.append(image);
      } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
        trayDefense2.append(image);
      }
      handLength--;
    });
  } else {
    alert("joue une carte !");
  }
});
