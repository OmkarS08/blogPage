//jshint esversion:6
/*-------------npmPackages--------------------------- */
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash"); // it used for configuring the string like lowercase and uppercase conversion

/*-----------------WebContent-------------------------*/

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

/*---------------package Usage Code---------------------- */

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // to use Css content present in Public folder

/*-------------------Global Variable----------------------- */

const PostFinal = [];

/*----------------------get request------------------------ */

app.get("/", function(req, res) {
    res.render("home", { homeContent: homeStartingContent, posts: PostFinal });
});

app.get("/about", function(req, res) {
    res.render("about", { AboutContent: aboutContent })
});

app.get("/contact", function(req, res) {
    res.render("contact", { contact: contactContent })
});

app.get("/compose", function(req, res) {
    res.render("compose");
});

app.get("/posts/:item", function(req, res) { //
    const requestedPost = _.lowerCase(req.params.item); //_.lowerCase function from lodash library


    for (let i = 0; i < PostFinal.length; i++) {

        const storedPost = _.lowerCase(PostFinal[i].tittle); //

        if (requestedPost === storedPost) {
            const postTittle = PostFinal[i].tittle; //stroing tittle
            const postContent = PostFinal[i].publish; //storing content
            res.render("post", { tittleChoosen: postTittle, ContentChoosen: postContent }); // rendering the values into post page

        }
    }
});


/*---------------------------post request------------------*/
app.post("/compose", function(req, res) {

    var post1 = {
            tittle: req.body.TittleText,
            publish: req.body.PublishText
        }
        //object creation
    PostFinal.push(post1);
    res.redirect("/");
    //redirect to home page;

})

/*-------------------Port Declaration------------------------- */
app.listen(3000, function() {
    console.log("Server started on port 3000");
});

/*----------------------Important Learnings-------------------- */

//res.render= is used to add values from backend to frontend
//res.redirect= res.redirect is used to redirect the page to the sppecified route
//Javascript object creation how to push it and how to acces it.
//Foreach:= is used to traverse each element of the array
//app.get:is used to create page on that route
//app.post: is used to aquire values from the web page if the method is post;
//Things are simple dont complex it. Break it into smaller parts and then execute
//whenever u fork or clone a project to add all the dependencies just use :  "git install" command.