/**
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco di quadrati, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
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
        cell.addEventListener('click', function () {
            this.classList.add('clicked');
        })
        document.querySelector('#grid').appendChild(cell);
    }
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














