const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const PESO_INPUT = document.getElementById('peso');

// Function to handle the button click event
function handleClick() {
    calculate();
}

// Function to handle the Enter key press event
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

// Attach the click event listener to the button
CALCULAR.addEventListener('click', handleClick);

// Attach the key press event listener to the input field
PESO_INPUT.addEventListener('keypress', handleKeyPress);

// Main calculation function
function calculate() {
    const DATO = PESO_INPUT.valueAsNumber;
    const FLUText = (peso, factor) => `${peso} cc/hr`;
    const MANText = (peso, factor1, factor2) => `m+m/2 ${factor1} o ${factor2} cc/hr`;

    if (DATO > 0) {
        ERROR.style.display = 'none';
        let flujo, mantenimiento, mmMedio;

        if (DATO < 30) {
            flujo = hollidaySegar(DATO);
            mantenimiento = flujo / 24;
            mmMedio = mantenimiento * 1.5;
        } else {
            flujo = superficieCorporal(DATO);
            const primerResultado = flujo * 1500;
            const segundoResultado = flujo * 2000;
            MAN.innerHTML = MANText(flujo, primerResultado, segundoResultado);
        }

        FLU.innerHTML = FLUText(flujo);
        FLU.style.display = 'block';
        MAN.style.display = 'block';
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
}

function superficieCorporal(peso) {
    console.log(peso)
    let volumen = ((peso * 4) + 7) / (peso + 90)
    return volumen
}


function hollidaySegar(peso) {
    let flujo = 0;
    if (peso < 10) {
        flujo = peso * 100
    }else if (peso >= 10 && peso <= 20){
        flujo = 1000 + (peso - 10) * 50
    }
    else if (peso >= 20 && peso <= 30){
        flujo = 1500 + (peso - 20) * 20
    }
    return flujo
}
