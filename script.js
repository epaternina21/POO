// crear una pausa entre las comparaciones y los intercambios de elementos durante el proceso de ordenamiento
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// toma una cadena inputStr como entrada.
// valida y convierte una cadena de entrada en un array de números flotante
function parseArrayInput(inputStr) {

    // la divide en tokens utilizando expresiones regulares
    // para encontrar espacios en blanco y eliminarlos (al principio y al final de la cadena)
    
    const tokens = inputStr.trim().split(/\s+/);

    // luego convierte cada token a un número flotante usando parseFloat
    // map se utiliza para aplicar la función de conversión a cada elemento en el array tokens.
    const array = tokens.map(function(elem) {
        return parseFloat(elem);
    });

    //  Comprueba si la longitud del array después de
    // la conversión es igual a la longitud del array tokens original
    // y si algún elemento en el array no es un número devuelve null

    if(array.length !== tokens.length || array.some(function(elem) {
        return isNaN(elem);
    })) {
        return null;
    }
    return array;
}

// convierte un array en una representación HTML y la inserta en un elemento específico en el documento HTML, permitiendo visualizar los elementos del array en la página web.
function insertArrayToHtml(array) {
    // crear una cadena HTML concatenando los elementos del array.
    const html = '<div class="array-element">' +
        array.join('</div><div class="array-element">') +
        '</div>';
    // selecciona el elemento con el ID 'array' en el documento HTML y establece su contenido HTML como la cadena generada en el paso anterior. Como resultado, los elementos del array se mostrarán en el documento HTML dentro del elemento con el ID 'array'.
    document.getElementById('array').innerHTML = html;
}

// visualizar los elementos que están siendo comparados
function highlightElements(i, j, additionalClass) {
    // Esta línea obtiene todos los elementos secundarios del elemento con el ID 'array' en el documento HTML y los almacena en la variable array
    const array = document.getElementById('array').children;
    //  Esta línea agrega la clase additionalClass al elemento en la posición i del array HTML.
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
}

// actualizar el contenido y la clase de un elemento del DOM con el ID 'status' en función del estado ('comparing' o 'swapping') proporcionado como argumento. 
function setStatus(status) {
    // obtiene el elemento del DOM
    const statusElem = document.getElementById('status');
    // Esta línea actualiza el contenido del elemento statusElem
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}
const bubbleSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if(!array){
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    for(let i = n - 1;i > 0;i--)
        for(let j = 0;j < i;j++){
            // Actualiza el contenido del elemento en el documento HTML
            insertArrayToHtml(array);
            // Resalta los elementos que se están comparando en el array
            highlightElements(j, j + 1, 'compared');
            // Establece el estado actual del proceso
            setStatus('comparing');
            // la ejecución se pausa durante 1 segundo antes de proceder con la siguiente iteración
            await sleep(1000);
            if(array[j] > array[j + 1])
            {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                insertArrayToHtml(array);
                highlightElements(j, j + 1, 'swapped');
                setStatus('swapping');
                await sleep(1000);
            }
            
        }
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
}
document.getElementById('submit-array').addEventListener('click', bubbleSort);