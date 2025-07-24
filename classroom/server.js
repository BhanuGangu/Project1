
const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session')
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const path = require('path');
const sessionOptions = {
     secret:"Mysecretcode",
    resave:false,
    saveUninitialized:true
}
 
app.set('view engin','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(cookieParser("secretcode"));
app.use(flash());
app.use(session(sessionOptions));

app.get('/', (req, res) => {
    res.send('it is root user');
});

app.get('/test',(req,res)=>{
    res.send('test ok');
});

app.get('/reqcount',(req,res)=>{
    if(req.session.count){
        req.session.count++
    }else{
        req.session.count = 1;
    }
    res.send(`you send ${req.session.count} time of request`);
})

app.get('/getcookies',(req,res)=>{
    res.cookie("greet","India");
    res.cookie('name',"Bhanu");
    let {name} = req.cookies;
    res.send(`hello, ${name}`);
})

app.get('/getsignedcookie',(req,res)=>{
    res.cookie('made-In',"India",{signed:true});
    res.send('done!');
})

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verifyed");
})

app.use('/users', users);
app.use('/posts', posts);


app.get('/register',(req,res)=>{
    let {name = "Unknow"} = req.query;
    req.session.name = name;
    if(name === "Unknow"){
        req.flash('error','user is not register');
    }else{
        req.flash('success',"user register successfully!");
    }
    res.redirect('/hello')
})

app.get('/hello',(req,res)=>{
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('error');
    res.render("page.ejs",{name :  req.session.name});
})


// app.get('/reqcount',(req,res)=>{
//     res.send(`you send x time request`);
// })

// app.get('/test', (req, res) => {
//     res.send('it was tested');
// })


app.listen(port, () => {
    console.log('this port is working');
});