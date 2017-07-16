/**
 * Created by Ivan on 4/29/2017.
 */
const ProductCategory = require('../Schemas/ProductCategory');
const Product = require('../Schemas/Product');
const Company = require('../Schemas/Company');

exports.getAllProductCategories = function (req, res) {
    ProductCategory.find({}, function (err, productCategories) {
        if (err) {
            res.status(500).json("An error occurred");
        }
        else {
            res.status(200).json(productCategories);
        }
    })
};

exports.getProductCategoryById = function (req, res) {
    if (req.body._id) {
        ProductCategory.findOne({'_id': req.body._id}, function (err, productCategory) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!productCategory) {
                res.status(400).json("Invalid productCategory id");
            }
            else {
                res.status(200).json(productCategory);
            }
        })
    }
    else {
        res.status(400).json("No productCategory id");
    }
};

exports.getProductCategoryCompanies = function (req, res) {
    if (req.body._id) {
        ProductCategory.findOne({'_id': req.body._id}, function (err, productCategory) {
            if (err) {
                res.status(500).json('An error occurred');
            }
            else if (!productCategory) {
                res.status(400).json("Invalid productCategory id");
            }
            else {
                Company.find({'_id': {$in: productCategory._companies}}, function (err, companies) {
                    if (err) {
                        res.status(500).json("An error occurred");
                    }
                    else {
                        res.status(200).json(companies);
                    }
                })
            }
        })
    }
    else {
        res.status(400).json("No productCategory id");
    }
};

exports.getProductCategoryProducts = function (req, res) {
    if (req.body._id) {
        ProductCategory.findOne({'_id': req.body._id}, function (err, productCategory) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!productCategory) {
                res.status(400).json("Invalid productCategory id");
            }
            else {
                Product.find({'_id': {$in: productCategory._products}}, function (err, products) {
                    if (err) {
                        res.status(500).json("An error occurred");
                    }
                    else {
                        res.status(200).json(products);
                    }
                })
            }
        })
    }
    else {
        res.status(400).json("No productCategory id");
    }
}