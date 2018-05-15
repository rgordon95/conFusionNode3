const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var favoriteSchema = new Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  dishes: ({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish"
  })
});

var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;