/**
 * Created by Ivan on 5/7/2017.
 */
var express = require('express');
var router = express.Router();

const companyCategoryController = require('../controllers/company-category');
const productCategoryController = require('../controllers/product-category');
const companyController = require('../controllers/company');
const productController = require('../controllers/product');
const authController = require('../controllers/authentication');

//router.use(authController.authenticate);


router.route('/products').get(productController.getAllProducts);
router.route('/company').get(companyController.getAllCompanies);
router.route('/companycategories').get(companyCategoryController.getAllCompanyCategories);
router.route('/productcategories').get(productCategoryController.getAllProductCategories);

router.route('/productcategoriesbycompanycategory').post(companyCategoryController.getCompanyCategoryProductCategories);
router.route('/companiesbyproductcategory').post(productCategoryController.getProductCategoryCompanies);

router.route('/productsbyproductcategory').post(productCategoryController.getProductCategoryProducts);
router.route('/productsbycompany').post(companyController.getCompanyProducts);

module.exports = router;