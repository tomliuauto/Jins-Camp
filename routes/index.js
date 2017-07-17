var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
// var async = require("async");
// var nodemailer = require("nodemailer");
// var crypto = require("crypto");

//root route
router.get("/", function(req, res){
    res.render("landing");
});



   
//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    // eval(require("locus"));
    if(req.body.adminCode === "tomFly2010"){
        newUser.isAdmin = true;
    };
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to TexasCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form

router.get("/login", function(req, res) {
    res.render("login");
});

//handing login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

//forget password
// router.get('/forgot', function(req, res) {
//     res.render('forgot');
// });




module.exports = router;