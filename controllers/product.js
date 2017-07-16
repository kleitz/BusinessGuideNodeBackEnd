const Product = require('../Schemas/Product');

const ProductCategory = require('../Schemas/ProductCategory');
const CompanyCategory = require('../Schemas/CompanyCategory');
const Company = require('../Schemas/Company');

exports.getAllProducts = function (req, res) {
    Product.find({}, function (err, products) {
        if (err) {
            res.status(500).json(err);//"An error occurred");
        }
        else {
            res.status(200).json(products);
        }
    })
};

exports.getProductById = function (req, res) {
    if (req.body._id) {
        Product.findOne({'_id': req.body._id}, function (err, product) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else {
                res.status(200).json(product);
            }
        })
    }
    else {
        res.status(400).json("No product id");
    }
};

exports.getProductCompanies = function (req, res) {
    if (req.body._id) {
        Product.findOne({'_id': req.body._id}, function (err, product) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!product) {
                res.status(400).json("Invalid product id");
            }
            else {
                Company.find({'_id': {$in: product._companies}}, function (err, companies) {
                    if (err) {
                        res.status(500).json("An error occurred");
                    }
                    else {
                        res.status(200).json(companies);
                    }
                });
            }
        });
    }
    else {
        res.status(400).json("No product id");
    }
};


exports.getAllProductsCategoryByCompanyCategory = function (req,res) {
    if(req.body.companyCategory ) {
      CompanyCategory.findOne({"name":req.body.companyCategory},function (err,companyCategory) {
          if(err) {
              res.status(500).json("An error occurred");
          }
          else if(!companyCategory) {
              res.status(400).json("Selected company category doesn't exist");
          }
          else {
              // mongoose uvek vraca _id i mora da se skloni
              var querry = companyCategory.select('productCategories - _id');
              querry.exec(function(err,productCategories) {
                  if(err) {
                       res.status(500).json("An error occurred");
                  }
                  else {
                      res.send(productCategories);
                  }
              });
          }

      });
    }
    else {
        res.status(400).json("Missing company category");
    }

}

