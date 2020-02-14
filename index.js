const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connections[0].name}"`);

    // to delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // to add one recipe
    return Recipe.create({
      title: 'Brazilian Milk Pudding',
      level: 'Easy Peasy',
      ingredients: ['1 cup sugar', '1 can sweetened condensed milk', '14 ounces milk', '3 eggs'],
      cuisine: 'Brazilian',
      dishType: 'Dessert',
      image: 'https://www.dvo.com/recipe_pages/brazil/Caramel_Pudding.jpg',
      duration: 60,
      creator: 'Chef Palmieri'
    });
  })
  .then(recipeDocument => {
    console.log('Recipe title: ', recipeDocument.title);
  })
  .then(x => {
    // to add multiple recipes
    return Recipe.insertMany(data);
  })
  .then(data => {
    data.forEach(response => {
      console.log('Recipe title: ', response.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log("The Rigatoni alla Genovese's duration was updated.");
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('The Carrot Cake was removed.');
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Has disconnected');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
