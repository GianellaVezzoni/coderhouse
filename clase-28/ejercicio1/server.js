const args = process.args;
const numbers = args.slice(2);

process.on("exit", (code) => {
    if(code){
        console.log("saliendo con el código ", code)
    }else{
        console.log("saliendo sin errores")
    }
})

process.on("uncaughtException", (err) => {
    console.log("El error ", err)
    switch(err){
        case 'entrada vacia': return process.exit(-1)
        case "error de tipo": return process.exit(-5)
    }
})

function validateNumbers(numbers){
    if(numbers.length == 0){
        throw {
            description: "entrada vacia"
        }
    }
    for(const num of numbers){
        const val = Number(num);
        if(isNaN(val)){
            throw {
                description: "error de tipo",
                number: num,
                type: numbers.map(n => isNaN(n) ? typeof n : 'number')
            }
        }
    }
}

function avg(numbers){
    let total = 0;
    for(const num of numbers){
        const val = Number(num);
        total += val;
    }
    return total / numbers.length;
}

const datos = {
    numeros: numbers,
    promedio: avg(numbers),
    max: Math.max(...numbers),
    min: Math.min(...numbers),
    ejecutable: process.execPath.split('/').pop(),
    pid: process.pid
}