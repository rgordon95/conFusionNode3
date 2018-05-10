const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ "user": req.user._id })
      .populate('user') //populate user info
      .populate('dishes') //populate dishes info
      .then((favorites) => {
        if (!favorite.params.id.equals(page.author)) {
          err = new Error('Permission denied. Are you correctly logged in?');
          err.status = 403; //forbidden
          return next(err);
        } else {
          res.StatusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorites);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  /*
  // .post
  // check user is same
  // create if no fave file,
  // dont post if duplicate
*/

  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' + req.params.favorites.User);
  })

  /*
   * .delete
   * //delete entire list if user is same else reject
   */
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.find()
      .then //is user the same?
  }); //end CRUD DELETE & ALL CRUD operations for /favorite/


favoriteRouter.route('/:dishId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/:disId');
  })
  //create favorites document if it does not already exist still not done
  //also check using indexOf(dishes) etc. to see if dish already added
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findById(req.dishes.dish)
      .then((favorite) => {
        if (favorites.user.id(req.params.user).equals(req.user)) {
          if (favorite != null) {
            req.body.user = req.user.id;
            favorite.dishes.push(req.body);
            favorite.save()
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
              }, (err) => next(err));
          } else {
            err = new Error('Favorite ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
          }
        } else {
          err = new Error('Permission denied');
          err.status = 400;
          return next(err);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findByIdAndRemove(req.params.dishId)
    //same as post above
  });

module.exports = favoriteRouter;