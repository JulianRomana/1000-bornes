let images = require("../assets/*.png");

// Different variables
let speed1 = document.querySelectorAll("span")[0];
let speed2 = document.querySelectorAll("span")[1];

let shuffleButton = document.querySelector("#shuffleButton");
let drawCardButton = document.querySelector("#deck__button");
let countingAdded = 1;
let play = true;
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
  handArray: [],
  speed: 0,
  tray: document.querySelector("#tray1"),
  hand: document.querySelector("#hand1"),
  handCard: document.querySelectorAll("#hand1 li"),
  trayAttack: document.querySelectorAll("#tray1 figure")[0],
  trayDefense: document.querySelectorAll("#tray1 figure")[1],
  trayBonus: document.querySelectorAll("#tray1 figure")[2],
  traySpeed: document.querySelectorAll("#tray1 figure")[3],
  shuffleHand() {
    for (let i = 0; i < this.handCard.length; i++) {
      randomCards(this.handArray, this.handCard[i]);
    }
  }
};

// Object who represents the player 2
let player2 = {
  handArray: [],
  speed: 0,
  tray: document.querySelector("#tray2"),
  hand: document.querySelector("#hand2"),
  handCard: document.querySelectorAll("#hand2 li"),
  trayAttack: document.querySelectorAll("#tray2 figure")[0],
  trayDefense: document.querySelectorAll("#tray2 figure")[1],
  trayBonus: document.querySelectorAll("#tray2 figure")[2],
  traySpeed: document.querySelectorAll("#tray2 figure")[3],
  shuffleHand() {
    for (let i = 0; i < this.handCard.length; i++) {
      randomCards(this.handArray, this.handCard[i]);
    }
  },
  drawCard() {
    let randomNumber = Math.floor(Math.random() * cards.length);
    let randomCard = cards[randomNumber];
    let newLi = document.createElement("li");
    let newCard = document.createElement("img");
    newCard.setAttribute("src", randomCard.image);
    newCard.setAttribute("alt", randomCard.name);
    newLi.appendChild(newCard);
    this.handArray.push(randomCard);
    this.hand.appendChild(newLi);
    cards.splice(randomNumber, 1);
    newLi.addEventListener("click", () => {
      if (play) {
        let innerImage = newLi.querySelector("img");
        let attribute = innerImage.getAttribute("alt");
        if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
          if (this.traySpeed.children[1]) {
            this.traySpeed.children[1].remove();
          }
          this.traySpeed.append(innerImage);
          this.speed = this.speed + parseInt(attribute);
          speed2.innerHTML = `votre score: ` + this.speed;
        } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
          this.trayBonus.append(innerImage);
        } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
          player1.trayAttack.append(innerImage);
        } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
          this.trayDefense.append(innerImage);
        }
        this.handArray.splice(7, 1);
        countingAdded = 0;
        play = false;
      } else {
        alert("tire une de carte");
      }
    });
  },
  playCard() {
    for (let i = 0; i < this.handCard.length; i++) {
      this.handCard[i].addEventListener("click", () => {
        if (play) {
          let innerImage = this.handCard[i].querySelector("img");
          let attribute = innerImage.getAttribute("alt");
          if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
            if (this.traySpeed.children[1]) {
              this.traySpeed.children[1].remove();
            }
            this.traySpeed.append(innerImage);
            this.speed = this.speed + parseInt(attribute);
            speed2.innerHTML = `votre score: ` + this.speed;
          } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
            this.trayBonus.append(innerImage);
          } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
            player1.trayAttack.append(innerImage);
          } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
            this.trayDefense.append(innerImage);
          }
          this.handCard[i].remove();
          this.handArray.splice(i, 1);
          countingAdded = 0;
          play = false;
        } else {
          alert("tire une de carte !");
        }
      });
    }
  }
};

// Beggining of the game
shuffleButton.addEventListener("click", () => {
  player1.shuffleHand();
  player2.shuffleHand();
  shuffleButton.remove();
  player2.hand.classList.add("animation__hand2");
  player1.hand.classList.add("animation__hand1");
  drawCardButton.removeAttribute("disabled");
  setTimeout(function() {
    player1.tray.className = "tray1";
    player2.tray.className = "tray2";
  }, 1200);
});

// Adding cards to the tray for player 1

for (let i = 0; i < player1.handCard.length; i++) {
  player1.handCard[i].addEventListener("click", () => {
    let innerImage = player1.handCard[i].querySelector("img");
    let attribute = innerImage.getAttribute("alt");
    if (attribute === "50" || attribute === "25" || attribute === "75" || attribute === "100" || attribute === "200") {
      if (player1.traySpeed.children[1]) {
        player1.traySpeed.children[1].remove();
      }
      player1.traySpeed.append(innerImage);
      player1.speed = player1.speed + parseInt(attribute);
      speed1.innerHTML = `votre score: ` + player1.speed;
    } else if (attribute === "increvable" || attribute === "vehicule_prioritaire" || attribute === "as_volant" || attribute === "citerne") {
      player1.trayBonus.append(innerImage);
    } else if (attribute === "feux_rouge" || attribute === "panne_essence" || attribute === "crevé" || attribute === "accident" || attribute === "limite_vitesse") {
      player2.trayAttack.append(innerImage);
    } else if (attribute === "feux_vert" || attribute == "reparation" || attribute == "fin_vitesse" || attribute == "essence" || attribute == "roue_secours") {
      player1.trayDefense.append(innerImage);
    }
  });
}

// Adding cards to the tray for player  2

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
  if (countingAdded === 0) {
    player2.drawCard();
    countingAdded = 1;
    play = true;
  } else {
    alert("joue une carte !");
  }
});
player2.playCard();
