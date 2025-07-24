const User = require('../models/User.js');



module.exports.getSingup = (req, res) => {
    res.render('users/signup.ejs');
}

module.exports.postSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash('success', "Welcome to Wanderlust");
            res.redirect('/listings');
        })
    } catch (e) {
        req.flash('error', e);
        res.redirect('/signup');
    }
}

module.exports.getLogin = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.postLogin = async (req, res) => {
    req.flash('success', 'Welcome back to Wanderlust');
    let resUrl = res.locals.redirectUrl || "/listings";
    res.redirect(resUrl);
}

module.exports.getLogout = (req,res,next)=>{
    req.logout((err)=>{
        if (err) {
            return next(err);
        }
        req.flash('success','You are logged out!');
        res.redirect('/listings');
    })
}