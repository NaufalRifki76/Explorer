if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config')
initializePassport(passport, email => users.find(user => user.email === email)
,id =>users.find(user => user.id === id)
)

const users =[]
app.set('view-engine','ejs');
app.use(express.urlencoded({ extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/public', express.static('public'));
app.get('/login',(req,res) =>{
    res.render('login.ejs');
})
app.get('/Hotels',(req,res) =>{
    res.render('Hotels.ejs');
})
app.get('/Bus',(req,res) =>{
    res.render('Bus.ejs');
})
app.get('/payment',(req,res) =>{
    res.render('payment.ejs');
})
app.post('/login',passport.authenticate('local', {
    successRedirect :'/Hotels',
    failureRedirect:'/login'
}))
app.get('/register',(req,res) =>{
    res.render('register.ejs');
})
app.post('/register',async (req,res) =>{
    try {
        const hashedpwd = await bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedpwd
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
   

})
app.listen(3000)