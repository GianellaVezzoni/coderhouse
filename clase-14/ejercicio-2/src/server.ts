import express from 'express';

import {Superficie} from './lib/superficie';
import {Perimetro} from './lib/perimetro';

const perimetro: Perimetro = new Perimetro();
const superficie: Superficie = new Superficie();

const app = express();

app.get('/perimetro/:figura/:param1/:param2?', (req, res) => {
    let {figura, param1, param2} = req.params;
    let resultado: Number;

    switch(figura) {
        case 'cuadrado':
            resultado = perimetro.calcularCuadrado(Number(param1));
            break;
        case 'reactangulo':
            resultado = perimetro.calcularRectangulo(Number(param1), Number(param2));
            break;
        case 'circulo':
            resultado = perimetro.calcularCirculo(Number(param1));
            break;
        default: resultado = 0;
            break;
    }

    return res.send({
        calculo: 'perimetro',
        figura,
        param1,
        param2,
        resultado
    });
});

app.get('/superficie/:figura/:param1/:param2?', (req, res) => {
    let {figura, param1, param2} = req.params;
    let resultado: Number;

    switch(figura) {
        case 'cuadrado':
            resultado = superficie.cuadrado(Number(param1));
            break;
        case 'reactangulo':
            resultado = superficie.rectangulo(Number(param1), Number(param2));
            break;
        case 'circulo':
            resultado = superficie.circulo(Number(param1));
            break;
        default: resultado = 0;
            break;
    }

    return res.send({
        calculo: 'superficie',
        figura,
        param1,
        param2,
        resultado
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});