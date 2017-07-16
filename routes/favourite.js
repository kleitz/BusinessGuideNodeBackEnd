/**
 * Created by Stefan Zivic on 7/13/2017.
 */

var express = require('express');
var router = express.Router();

const favouriteController = require('../controllers/favourite');

router.route('/adddiscount').post(favouriteController.addDiscount);
router.route('/removediscount').post(favouriteController.removeDiscount);

router.route('/getdiscountedproducts').post(favouriteController.getDiscountedProducts);
router.route('/getdiscountedcompanies').post(favouriteController.getDiscountedCompanies);


module.exports = router;