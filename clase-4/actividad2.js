const fs = require('fs');

const date = new Date();
fs.writeFileSync('fyh.txt', `${date}`,'utf-8');

try{
    const data = fs.readFileSync('fyh.txt', 'utf-8');
    console.log('El archivo: ', data);
}catch(err){
    throw new Error;
}