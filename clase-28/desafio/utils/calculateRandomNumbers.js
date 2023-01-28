function calculate(cant){
    const max = 1000;
    const min = 1;
    const numbers = [];
    for(let i = 0; i < cant; i++){
        let numberRandom = Math.floor((Math.random() * (max - min + 1)) + min);
        numbers.push(numberRandom);
    }
    return numbers.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
}

process.on('exit', () => {
    console.log('hilo terminado: ' + process.pid)
});

process.on('message', msg => {
    console.log(msg)
    console.log('hilo iniciado: ' + process.pid);
    const result = calculate(cant ? cant : 100000000)
    process.send(result)
    process.exit()
});

process.send('listo');