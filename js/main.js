/**
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco di quadrati, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
- abbiamo calpestato una bomba
- la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

 */


//? individuo è seleziono l'elemento che mi serve per dare il via alla funzione (colui che deve ascoltare)

document.getElementById('play').addEventListener('click',
    function () {
        createNewGame();
    })

    //? funzione che mi serve per sovrascrivere la precedente partita, senza avere il tasto reset

function createNewGame() {
    //? prima cosa da fare è selezionare il parent, in questo caso grid, che andrà a sovrascrivere il precedente "grid" con il vuoto
    document.querySelector('#grid').innerHTML = "";

    //? ora mi serve il livello selezionato dall'utente, dato che viene preso come stringa, devo quindi trasformarlo in numero intero
    const level = parseInt(document.getElementById('level').value);

    //? ora, dobbiamo generare la griglia in base alla dificolta scelta (level)
    //? quindi avremmo bisogno di due valori, il numero di celle per riga e numero di celle totali, in sostanza due argbomenti
    //? partiamo con il crearci due variabili

    let cellsNumber; //? numero celle totali
    let cellsPerRow; //? celle per riga

    isGameOver = false;

    let points = 0;//? mi creo un contatore che mi aggiunga il punteggio

    const NUMBER_OF_BOMBS = 16; //? COSTANTE CHE NON VA CAMBIATA VALORE ASSOLUTO
    switch (level) {
        case 1: //? che è anche il default
        default:
            cellsNumber = 100;
            //? possiamo decidere di inserire il numero di celle per riga qui, per ogni case, oppure unico con radice, in visione di un possibile cambiamento, meglio creare una regola generica
            break;
        case 2: //? secondo caso 81 celle
            cellsNumber = 81;
            break;
        case 3:
            cellsNumber = 49;
            break;
    }
    cellsPerRow = Math.sqrt(cellsNumber); //? celle per riga sarà sempre la radice quadrata del numero di righe dunque un quadrato

    //?  non mi resta che creare le celle all'interno del DOM
    //? per farlo devo selezionare il parent (grid) e inserisco le celle come figli.
    //# mi manca la funzione che generi il singolo elemento
    //? fatta la funzione createCells vado a richiamarla

    for (let i = 1; i <= cellsNumber; i++){
        const cell = createCells(i, cellsPerRow); //? creo una variabile che mi richiami la funzione che crea le celle dove il primo argomento (i numbers) sarà il nostro i e l'argomento cellsperrow sarà cells per row creato poco più sopra
        //| creo dentro l'eventlistner il mio if che mi verifichi che il valoer interno sia presente nella lista della bomblist oppure no per poi aggiungere la classe bomb oppure no
        let addClass = false;
        cell.addEventListener('click', function () {
            if (!isGameOver) {
                if (!bombs.includes(i)) {
                    addClass = true;
                    addClass = 'clicked'
                    //aggiungi un punto
                    points++;
                    writeInElementById('score', `Il tuo score è: ${points}`);
                } else {
                    addClass;
                    addClass = 'clicked-bomb';
                    writeInElementById('score', `Mi dispiace, hai perso, il tuo score è: ${points}`);
                    checkThisSound('grid', bombs, 'clicked-bomb');
                    isGameOver = true;
                    // ferma il punteggio
                }
                //? testare la versione con solo add e con la classe chemi aggiunge "le classi da ggiungere"
                cell.classList.add(addClass);
            }

        }, { once: true })
        document.querySelector('#grid').appendChild(cell);
    }
    //? fuori dal mio cilco for mi creo una nuova lista

    const bombs = generateBombList(NUMBER_OF_BOMBS, cellsNumber);
    console.log(bombs);
}

//? funzione per generare il singolo elemento
/**
 *
 * @param {*} number number of cells I need to create
 * @param {*} cellsPerRow number of cells per row that I want to have
 */
function createCells(number, cellsPerRow) {
    let cell = document.createElement('div'); //? creo l'elemento contenitore/div nel DOM
    cell.classList.add('square'); //? gli aggiungo la classe square creata in precedenza sul css

    cell.style.width = `calc(100% / ${cellsPerRow})`; //? divido lo spazio nella riga in base al numero totale di celle
    cell.style.height = cell.style.width; //? essendo quadrati....

    cell.innerHTML = `<span>${number}</span>`;  //? stampo il numero di celle in successione all'interno dell elemento creato ()cella

    return cell; //? per riportarmi la variabile creata, altrimenti non ci sarebbe
}

/*
    mi creo numeri random (16) da mettere in un array non ripetuti
    dobbiamo gestire il cambiamento al click
    devo verificare se il valore interno è valido o meno
        => nel caso in cui sia vero aggiungo una classe A
        => se è falso aggiungo una classe B
*/

/**
 *
 * @param {*} bombs number of bombs to generate
 * @param {*} numberOfCells number of cells to refer to for printing
 * @returns
 */

function generateBombList(bombs, numberOfCells) {
    //? dati i numeri di bombe (bombs) da generare ed il numero di celle generate(numberOfCells), creo un nuovo arrey
    //? per ogni cella bomba ne creo una nuova che non sia già stata occupata e la aggiungo alla bomblist, restituendola alla fine dela funzione
    const bombList = [];
    for (let i = 0; i < bombs; i++){
        bombList.push(generateUniqueRandomNumber(bombList, 1, numberOfCells));
    }
    return bombList;
}

/**
 * Function that generates a random number between two included values, which is not already present in the given blacklist.
 *
 * @param {*} numsBlacklist The blacklist to check.
 * @param {*} min The minimum value of the random generated integer.
 * @param {*} max The maximum value of the random generated integer.
 * @returns A random generated integer which is not present in the blacklist.
 */
function generateUniqueRandomNumber(numsBlacklist, min, max){
    // mi creo una variabile inizializzata a false, che mi controlla se ho generato un numero
    // valido oppure no
    let check = false;
    let randomInt;

    // creo un ciclo che continua finché non ho trovato un numero valido (assente in blacklist)
    while ( !check ){
        //  genero randomicamente un numero intero tra il min e il max passati come argomenti
        randomInt  = Math.floor(Math.random() * ((max + 1) - min) + min);
        // se il numero non è presente nella blacklist allora
        if (!numsBlacklist.includes(randomInt)) {
        // informo il resto della funzione che il numero è stato trovato ed è valido
        // ==> esco dal ciclo while
        check = true;
        }
    }
    // restituisco il numero valido che ho trovato
    return randomInt;
}
/**
 *
 * @param {*} elementId the element taken from the DOM
 * @param {*} stringToWrite overwrites the text with the updated score
 */

function writeInElementById(elementId, stringToWrite) {
    document.getElementById(elementId).innerHTML = stringToWrite;
}


//fleg bolleani per il bonus

//# voglo una funzione che mi mostri tutte le bombe dopo aver cliccato su una di esse
//# voglio che finito il numero di click si fermi
//# voglio che una volta toccata la bomba smetta di andare avanti

/**
 *
 * @param {*} parentElementId parent element identified by id in the DOM
 * @param {*} bombList array taken inside the function
 * @param {*} classToAdd class to add to the element taken in the Dom
 */

function checkThisSound (parentElementId, bombList, classToAdd){
    const squares = document.getElementById(parentElementId).children;
    for (let i = 0; i < squares.length; i++){
        if (bombList.includes(parseInt(squares[i].firstChild.innerHTML))) {
            squares[i].classList.add(classToAdd);
        }
    }
}
