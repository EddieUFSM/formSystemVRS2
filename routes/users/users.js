const express = require('express'), 
    router = express.Router(),
    bodyParser = require("body-parser"), 
    User = require('../.././models/user'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    Answer = require('../../models/answer'),
    LocalStrategy = require('passport-local'),
    Question = require('../.././models/question'),
    middleware = require("../../middleware");
    var {isLoggedIn, globalenvironment} = middleware; // destructuring assignment

    

/** bodyparser configuration */
router.use(bodyParser.urlencoded({extended: true}));
                          
/** HTTP methods configuration */
router.use(methodOverride("_method"));

/** set passport local*/
router.use(require("express-session")({
  secret: "formSystem",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//configure flash
const flash = require('connect-flash');
router.use(flash());

/**Configure global variables */
router.use(globalenvironment);

router.get('/perfil', isLoggedIn, (req, res) => { 
    res.render('profile');
});

// TO-DO: FAZER UMA VERIFICAÇÃO SE O USUÁRIO É ADMINISTRADOR
router.get('/dashboard', isLoggedIn, (req, res) => { 
    res.render('dashboard');
});
  
/** Updates User */
router.post("/updateInfos", function(req, res){
User.findOneAndUpdate({username: req.user.username},{gender: req.body.gender}, function(err){
    if(err) 
    {
    console.log(err);
    } 
    else 
    {
    res.json({ success: true });
    }
})
})

router.get('/home', isLoggedIn, (req, res) => {
    Question.find({}).nin("whoAnswered", [req.user._id]).gt("expirationDate", Date.now()).sort("-quantAnswers").then(function(a){
        Question.find({}).in("whoAnswered", [req.user._id]).gt("expirationDate", Date.now()).sort("-quantAnswers").then(function(b){
            Question.find({}).lt("expirationDate", Date.now()).sort("-quantAnswers").then(function(c){
                res.render('home', {'questions': a, 'answeredQuestions': b, 'fineshedQuestions': c});
            })
        })
    })
})

router.get('/answeredQuestions',(req, res) => {
    
})

module.exports = router;

