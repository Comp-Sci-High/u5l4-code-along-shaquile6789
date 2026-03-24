const express = require("express");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
// import and install your mongoose

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// add the middleware for reading JSONs from client request bodies
app.use(express.json())
// create a catSchema with name, age, color, adopted (boolean), and hasShots (boolean)
const catSchema = new mongoose.Schema({
  name: {type: String, required: true, default: "Meow"},
  age: {type: Number, required: true},
  color:{type: String, required: true},
  adopted: {type: Boolean, default: false},
  hasShots:{type: Boolean, default: false}
})
// connect your schema to a model called Cat
const Cat = mongoose.model("Cat", catSchema, "Cats")
// write an async function called startServer
// inside make sure to connect to mongoose w/ your SRV string with the database animalShelter
// inside start your server at port 3000
async function startServer(){
  await mongoose.connect("mongodb+srv://SE12:CSH2026@cluster0.ojlhi82.mongodb.net/?appName=Cluster0")


app.listen(3000, () =>{
  console.log("Server is starting")
})
    // The first time you run your code, uncomment the following once to add some cats to your DB
    
     
}

// call startServer
startServer()
// create a route handler for /cats that returns all cats

app.get("/cats", async (req, res) =>{
  const cat = await Cat.find({})
  res.json(cat)
})

// create a route handler for /cats/adopt that returns only cats that haven't been adopted
app.get("/cats/adopt", async (req, res) =>{
  const cat = await Cat.find({adopted: false})
  res.json(cat)
})
// create a route handler for /cats/add to saves a new cat to the collection
// test it in Postman to make sure you can add new cats
app.post("/cats/add", async (req, res) =>{
  const newCat = await new Cat({
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    adopted: req.body.adopted,
    hasShots: req.body.hasShots

  }).save()
  res.json(newCat)
})

// set up the schema, model, and get + post routes for the shelter's volunteers
