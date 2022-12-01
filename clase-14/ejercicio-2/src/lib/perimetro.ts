export class Perimetro {
    
    calcularCuadrado(lado: number): number{
        return 4 * lado;
    }

    calcularRectangulo(base: number, altura: number): number{
        return 2*base + 2* altura;
    }

    calcularCirculo(radio: number): number{
        return 2*Math.PI*radio;
    }

}