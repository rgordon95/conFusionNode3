const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var faveDishSchema = new Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dishes"
  }
});

var favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dishes: [faveDishSchema]
}, {
  timestamps: true,
  usePushEach: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);
// var FavoriteDish = mongoose.model('FaveDish', faveDishSchema);

module.exports = Favorites;