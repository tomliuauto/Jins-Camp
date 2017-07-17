var mongoose =require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"my test camp",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_jPDeKPjoYR7Sh-X_RsDONzCGM8DYb_tu3LdYxijWJidFm3K",
        description:"bla bla bla"
    },
    {
        name:"my test2 camp",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkaLeyJ1ErUhBo5tOZ7Qwn5H3FfXhXHH9JK9wMgwzXernEMi3sQ",
        description:"bla bla bla"
    },
    {
        name:"my test3 camp",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiW5jNOYaVPfhMIh_fH6m_HTizYERa_E7B4-Wxcj62n5zR2EQM",
        description:"bla bla bla"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            }else{
                console.log("added a campground but I want an internet");
                //create a comment
                Comment.create(
                    {
                        text:"this place is great",
                        author:"Tom"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                        campground.comments.push(comment)
                        campground.save();
                        console.log("Create new comment");
                        }
                    });
            }
        });
    });
    });

};

module.exports = seedDB;
