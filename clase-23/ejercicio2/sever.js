import express from "express";
import session from "express-session";

const PORT = 8080;

const app = express();
app.use(express.json());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res)=> {
    if(!req.session?.contador){
        req.session.contador = 1;
        req.session.nombre = req.query.nombre || 'Gianella';
        res.send({
            message: `Hello there ${req.session.nombre}`
        });
    }else{
        req.session.contador++;
        res.send({
            message: `Hello there ${req.session.nombre}. you visited this web ${req.session.contador} times`
        });
    }
});

app.get("/olvidar", (req, res) => {
    const nombre = req.session.nombre || '';
    req.session.destroy(err => {
        if(err){
            res.json({
                error: 'olvidar',
                description: err
            })
        }else{
            res.json({
                message: `See you soon ${nombre}`
            })
        }
    });
});

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});