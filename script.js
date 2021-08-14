console.log("Ready !");
window.addEventListener("load", () => {
});


let p1 = {
	name: "Default",
	color: "#840202"
}

let p2 = {
	name: "Default2",
	color: "#f2f2f2"
}

const startButton = document.getElementById('startButton');
const joueur1 = document.getElementById('joueur1');
const joueur2 = document.getElementById('joueur2');

const nbLignes = document.getElementById('nbLignes');
let playerTurn = document.getElementById('joueur');
let victoryArea = document.getElementById('victoryArea');
let playedCazes = [];
let playerEnCours = p1;
let endGame = false;
let coordX;
let coordY;

//checkValue(nbLignes);



startButton.addEventListener('click', () =>{
	jeu(nbLignes.value);
	console.log(nbLignes.value);
})

//////////////////////////////////////
//					Mes fonctions						//
//////////////////////////////////////

/**
 * Fonction qui permet de lancer le jeu pour la première fois
 * @param {Number} nbLignes 
 */
function jeu(nbLignes){
	document.getElementById('menu').hidden = true;
	p1.name = joueur1.value;
	p2.name = joueur2.value;

	boardInit(nbLignes);

	let slots = document.querySelectorAll('#slot');

	playerTurn.textContent = "C'est à ton tour de jouer : " + playerEnCours.name;

	slots.forEach(slot =>  {

		slot.addEventListener('click', function() {

			if(!endGame){
				coordX = slot.parentNode.dataset.x;
				coordY = slot.dataset.y;

			if(playedCazes[coordX][coordY] == 0 ) {
				playedCazes[coordX][coordY] = playerEnCours.name; 
				slot.style.backgroundColor = playerEnCours.color;

				if(checkEndGame(playedCazes, playerEnCours.name, coordX, coordY)){
					victoryArea.textContent = playerEnCours.name + " a gagné la partie";
				}

				playerChange();

			}			
			}
		})
	})
}

//Vérifier si les inputs sont vide ou non pour permettre de lancer la partie
function checkValue(nbLignes, player1, player2){
	startButton.disabled = (nbLignes.value == "")  ? true : false;

	return true;
}

/**
 * Fonction qui permet de changer de joueur a chaque clique
 */
function playerChange() {
	playerEnCours = playerEnCours === p1 ? playerEnCours = p2 : playerEnCours = p1;
	//console.log(playerEnCours.name);
	playerTurn.textContent =  "C'est à ton tour de jouer : " + playerEnCours.name;
}

/**
 * Fonction qui permet de générer les lignes et colonnes du tableau de jeu.
 * Le dataset du tr définis la ligne du tableau
 * Le dataset du td définis la colonne du tableau
 * @param {Number} nbLignes 
 */
function boardInit(nbLignes){
	let plateau = document.getElementById('plateau');
	if( nbLignes !== 0){
		for(let x = 0; x < nbLignes ; x++){
			let newLigne = document.createElement('tr');
			newLigne.dataset.x = x;
			playedCazes[x] = [];
			plateau.appendChild(newLigne);
			for(let y = 0; y < nbLignes ; y++){
				let newCol = document.createElement('td');
				newCol.dataset.y = y;
				playedCazes[x].push(0);
				newCol.id = "slot";
				newLigne.appendChild(newCol);
			}
		};
		console.log(playedCazes);
	}
}

 /**
 * Function qui permet de vérifier si un alignement de 3 est validé sur une ligne.
  * @param {Array} $playedArr 
  * @param {String} $playerName 
  * @param {Number} coordX 
  * @returns true si la condition est validée
  */
// function checkwinHorizontale($playedArr, $playerName, coordX){
// 	for (let j=0 ; j<$playedArr.length ; j++){  
// 		if($playedArr[coordX][j] == $playerName && $playedArr[coordX][j+1] == $playerName  &&  $playedArr[coordX][j+2] == $playerName){ 
// 			return true;
// 		}	
// 	}
// }


/**
 * Function qui permet de jouer avec la condition de victoire Alignement Horizontale necessaire = nombre de lignes
 * @param {Array} $playedArr 
 * @param {String} $playerName 
 * @param {Number} coordX 
 * @returns 
 */
function checkwinHorizontale($playedArr, $playerName, coordX){
		if($playedArr[coordX].filter(item => item === $playerName ).length == nbLignes.value )
			return true;
}


/**
 * 
 * @param {Array} $playedArr 
 * @param {String} $playerName 
 * @param {Number} coordY 
 */
// function checkwinVertical($playedArr, $playerName, coordY){
// 	for (let j=0 ; j<$playedArr.length-2 ; j++){  
// 		if( $playedArr[j][coordY] == $playerName && $playedArr[j+1][coordY] == $playerName  && $playedArr[j+2][coordY] == $playerName){
// 			return true;
// 		}
// 	}
// }

/**
 * Function qui permet de jouer avec la condition de victoire Alignement verticale necessaire = nombre de lignes
 * @param {Array} $playedArr 
 * @param {String} $playerName 
 * @param {Number} coordY 
 * @returns 
 */
function checkwinVertical($playedArr, $playerName, coordY){
	 let tempArray = [];

		for(let i = 0; i < nbLignes.value; i++)
			tempArray.push($playedArr[i][coordY]);

		if(tempArray.filter(item => item === $playerName).length == nbLignes.value)
			return true;
		
}




/**
 * Function qui vérifie si 3 jetons sont alignés en diagonale
 * @param {Array} $playedArr 
 * @param {String} $playerName 
 * @returns 
 */
// function checkwinDiagonales($playedArr, $playerName){ 
// 	for(let k = 0; k < $playedArr.length-2 ; k++){	
// 		for(let j = 0; j < $playedArr.length ; j++){
// 			if($playedArr[k][j] === $playerName &&
// 				 $playedArr[k+1][j+1] === $playerName &&
// 				 $playedArr[k+2][j+2] === $playerName ){
// 				return true;
// 			}			
// 			if($playedArr[k][j] === $playerName &&
// 				 $playedArr[k+1][j-1] === $playerName &&
// 				 $playedArr[k+2][j-2] === $playerName ){
// 				return true;
// 			}
// 		}
// 	}
// 	return false;
// }


/**
 * 
 * @param {Array} $playedArr 
 * @param {String} $playerName 
 * @returns 
 */
function checkwinDiagonales($playedArr, $playerName){ 
	let tempArray = [];
	let tempArray2 = [];

	for(let k = 0; k < $playedArr.length; k++)
		tempArray.push($playedArr[k][k]);

	if(tempArray.filter(item => item === $playerName ).length == nbLignes.value)
		return true;

	let nbLignes2 = nbLignes.value - 1;

	for(let i = 0; i<nbLignes.value; i++){	
			tempArray2.push($playedArr[i][nbLignes2]);
			nbLignes2--;
	}
	
	if(tempArray2.filter(item => item === $playerName ).length == nbLignes.value)
		return true;
}




/**
 * Fonction qui permet de vérifier si un joueur a gagné et donc gagné la partie
 * @param {Array} playedCazes 
 * @param {String} playerEnCours 
 * @param {Number} coordX 
 * @param {Number} coordY 
 * @returns 
 */
function checkEndGame(playedCazes, playerEnCours, coordX, coordY){
	if(	checkwinHorizontale(playedCazes,playerEnCours, coordX) ||
			checkwinVertical(playedCazes, playerEnCours, coordY) ||
			checkwinDiagonales(playedCazes,playerEnCours)){
			victoryArea.textContent = playerEnCours + " a gagné la partie";
			endGame = true;
			return true;
		}
}





