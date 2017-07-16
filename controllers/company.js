
const Company = require('../Schemas/Company');
const ProductCategory = require('../Schemas/ProductCategory');
const Product = require('../Schemas/Product');


exports.getAllCompanies = function (req, res) {
    Company.find({}, function (err, companies) {
        if (err) {
            res.status(500).json("An error occurred");
        }
        else {
            res.status(200).json(companies);
        }
    })
};

exports.getCompanyById = function (req, res) {
    if (req.body._id) {
        Company.findOne({'_id':req.body._id}, function (err, company) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!company) {
                res.status(400).json("Invalid company id");
            }
            else {
                res.status(200).json(company);
            }
        })
    }
    else {
        res.status(400).json("No company id");
    }
};

exports.getCompanyProductCategories = function (req, res) {
    if (req.body._id) {
        Company.findOne({'_id': req.body._id}, function (err, company) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!company) {
                res.status(400).json("Invalid company id");
            }
            else {
                ProductCategory.find({'_id': {$in: company._productCategories}}, function (err, productCategories) {
                    if (err) {
                        res.status(500).json("An error occurred");
                    }
                    else {
                        res.status(200).json(productCategories);
                    }
                })
            }
        })
    }
    else {
        res.status(400).json("No company id");
    }
};

exports.getCompanyProducts = function (req, res) {
    if (req.body._id) {
        Company.findOne({'_id': req.body._id}, function (err, company) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!company) {
                res.status(400).json("Invalid company id");
            }
            else {
                Product.find({'_id': {$in: company._products}}, function (err, products) {
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
    else  {
        res.status(400).json("No company id");
    }
};