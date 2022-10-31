const fin = () => console.log("termine");

function mostrarLetras(string, callbackFc) {
  let i = 0;
  const timer = setInterval(() => {
    if (i < string.length) {
      console.log(string[i]);
      i++;
    } else {
      clearInterval(timer);
      callbackFc();
    }
  }, 1000);
}

setTimeout(() => {
  mostrarLetras("Coder", fin);
}, 0);
setTimeout(() => {
  mostrarLetras("Coder", fin);
}, 250);
setTimeout(() => {
  mostrarLetras("Coder", fin);
}, 500);

mostrarLetras("Hola", fin);
