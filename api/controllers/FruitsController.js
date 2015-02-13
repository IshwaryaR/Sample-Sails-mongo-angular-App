/**
 * FruitsController
 *
 * @description :: Server-side logic for managing fruits
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	 index: function (req, res) { 
    res.view(null, { 
        title: "Fruit App" 
    }); 
  } 
};

