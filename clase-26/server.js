import express from "express";
import {engine as exphbs} from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";

const API_KEY = "glvV83n4GD9bc9HVmeDRkHpmR";
const API_SECRET = "VS25VGIfHKfQKENGNJ4elKZ8bWj9VMjNSQRFEKak08FfXzPdOF";
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passport.use(new TwitterStrategy, ({
    consumerKey: API_KEY,
    consumerScret: API_SECRET,
    callbackUrl: '/auth/twitter/callback'
}, (token, tokenSecret, userProfile, done) => {
    console.log("user profile ", userProfile);
    done(null, userProfile);
}))


const app = express();
app.use(session({
    secret: 'secretttt',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('.hbs', exphbs({extname: '.hbs', defaultLayout: 'main.hbs'}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/datos');
    }else{
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/datos');
    }

    res.sendFile(__dirname + '/public/login.html');
});

app.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/datos');
    }

    res.sendFile(__dirname + '/public/login.html');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));


app.get('/datos', (req, res) => {
    
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        console.log("log out")
    });
});

app.listen(PORT, () => {
    console.log("Server running on port ", PORT);
});