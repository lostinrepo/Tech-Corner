//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const techStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogprojectDB", {useNewUrlParser: true});

const postSchema = {
  postid: Number,
  title: String,
  content: String
};

const userSchema = {
  name: String,
  email: String,
  pass: String,
  phone: Number
};



const Post = mongoose.model("Post", postSchema);

const User = mongoose.model("User", userSchema);



app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
     posts: posts
      } );
  });
});

app.get("/signup_success", function(req, res){

 
    res.render("signup_success");
 
});

app.get("/tech", function(req, res){

    Post.find({}, function(err, posts){
    res.render("tech", {
     posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

 

app.post("/compose", function(req, res){
  const post = new Post({
    postid: req.body.postId,
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/signup", function(req, res){
  res.render("signup");
});



app.get("/login", function(req, res){
  res.render("login");
});



app.post('/signup', function(req,res){ 
 
    const user = new User({
    name: req.body.name,
    email: req.body.email,
    pass: req.body.password,
    phone: req.body.phone 


  });


  user.save(function(err){
    if (!err){
       return res.redirect('/signup_success'); 
    }
  });

});
  
 


app.get("/datasc", function(req, res){
  res.render("datasc");
});

app.get("/iot", function(req, res){
  res.render("iot");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
