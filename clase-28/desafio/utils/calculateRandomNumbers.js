function calculate(cant){
    const numbers = [];
    for(let num in cant){

    }
}

process.on('exit', () => {
    console.log('hilo terminado: ' + process.pid)
});

process.on('message', msg => {
    console.log(msg)
    console.log('hilo iniciado: ' + process.pid);
    const result = calculate(cant)
    process.send(result)
    process.exit()
});

process.send('listo');