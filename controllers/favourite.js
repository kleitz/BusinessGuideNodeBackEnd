const Product = require('../Schemas/Product');
const Company = require('../Schemas/Company');

exports.addDiscount = (req, res) => {
    if (req.body.company && req.body.product) {
        Product.findOne({"_id": req.body.product}, function (err, product) {
            if (err) {
                res.status(500).json(err);//"Internal error.");
            }
            else if (!product) {
                res.status(400).json("Invalid product supplied.");
            }
            else {
                if (product._companies != null && product._companies.indexOf(req.body.company) > -1) {
                    if (product._discountCompanies != null && product._discountCompanies.indexOf(req.body.company) > -1) {
                        res.status(204).json("Product already discounted");
                    }
                    else {
                        Company.findOne({"_id": req.body.company}, function (err, company) {
                            if (err) {
                                res.status(500).json(err);
                            }
                            else if (!company) {
                                res.status(400).json("Invalid company supplied");
                            }
                            else {
                                product._discountCompanies.push(req.body.company);
                                product.save(function (err) {
                                    if (err) {
                                        res.status(500).json(err);//"Internal error.");
                                    }
                                    else {
                                        if (company._discountProducts != null && company._discountProducts.indexOf(req.body.product) > -1) {
                                            res.status(200).json({"product": product, "company": company});
                                        }
                                        else {
                                            company._discountProducts.push(req.body.product);
                                            company.save(function (err) {
                                                if (err) {
                                                    res.status(500).json(err);
                                                }
                                                else {
                                                    res.status(200).json({"product": product, "company": company});
                                                }
                                            })
                                        }
                                    }
                                });
                            }
                        });

                    }
                }
                else {
                    res.status(400).json("Selected company doesn't sell this product.");
                }
            }
        });
    }
    else {
        res.status(400).json("Missing parameters.");
    }
};

exports.removeDiscount = ((req, res) => {
    if (req.body.company && req.body.product) {
        Product.findOne({"_id": req.body.product}, function (err, product) {
            if (err) {
                res.status(500).json(err);//"Internal error.");
            }
            else if (!product) {
                res.status(400).json("Invalid product supplied.");
            }
            else {
                if (product._companies != null && product._companies.indexOf(req.body.company) > -1) {
                    if (product._discountCompanies != null && product._discountCompanies.indexOf(req.body.company) > -1) {

                        Company.findOne({"_id": req.body.company}, function (err, company) {
                            if (err) {
                                res.status(500).json(err);
                            }
                            else if (!company) {
                                res.status(400).json("Invalid company supplied");
                            }
                            else {
                                product._discountCompanies.splice(product._discountCompanies.indexOf(req.body.company), 1);
                                product.save(function (err) {
                                    if (err) {
                                        res.status(500).json(err);//"Internal error.");
                                    }
                                    else {
                                        if (company._discountProducts != null && company._discountProducts.indexOf(req.body.product) > -1) {
                                            company._discountProducts.splice(company._discountProducts.indexOf(req.body.product), 1);
                                            company.save(function (err) {
                                                if (err) {
                                                    res.status(500).json(err);
                                                }
                                                else {
                                                    res.status(200).json({"product": product, "company": company});
                                                }
                                            })
                                        }
                                        else {
                                            res.status(200).json({"product": product, "company": company});
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.status(204).json("Product already at full price");
                    }
                }
                else {
                    res.status(400).json("Selected company doesn't sell this product.");
                }
            }
        });
    }
    else {
        res.status(400).json("Missing parameters.");
    }
});

exports.getDiscountedProducts = (req, res) => {
    if (req.body.products) {
        if (req.body.products instanceof Array && req.body.products.length != 0) {
            Product.find({"_id": {$in: req.body.products}, "_discountCompanies" : {$ne: null}}, function (err, products) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.status(200).json(products);
                }
            });
        }
        else {
            res.status(400).json("Invalid products array supplied");
        }
    }
    else {
        Product.find({"_discountCompanies": {$ne: null}}, function (err, products) {
            if (err) {
                res.status(500).json(err);//"Internal error.");
            }
            else {
                res.status(200).json(products);
            }
        });
    }
};

exports.getDiscountedCompanies = (req, res) => {
    if (req.body.companies) {
        if (req.body.companies instanceof Array && req.body.companies.length != 0) {
            Company.find({"_id": {$in: req.body.companies}, "_discountProducts" : {$ne: null}}, function (err, companies) {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.status(200).json(companies);
                }
            });
        }
        else {
            res.status(400).json("Invalid companies array supplied");
        }
    }
    else {
        Company.find({"_discountProducts": {$ne: null}}, function (err, companies) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(companies);
            }
        });
    }

};
