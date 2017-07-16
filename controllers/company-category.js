/**
 * Created by Ivan on 4/29/2017.
 */

const CompanyCategory = require('../Schemas/CompanyCategory');
const Company = require('../Schemas/Company');
const ProductCategory = require('../Schemas/ProductCategory');

exports.getAllCompanyCategories = function (req,res) {
    CompanyCategory.find({},function (err,categories)  {
        if(err) {
             res.status(500).json("An error occurred");
        }
        else {
            res.status(200).json(categories);
            // let companiesMap = {};
            //
            // categories.forEach(function (compantyCategory) {
            //     companiesMap[compantyCategory._id] = compantyCategory;
            //
            // });
            // res.send(companiesMap);
        }
    });

};

exports.getCompanyCategoryById = function (req, res) {
    if (req.body._id) {
        CompanyCategory.findOne({'_id': req.body._id}, function (err, companyCategory) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!companyCategory) {
                res.status(400).json("Invalid companyCategory id");
            }
            else {
                res.status(200).json(companyCategory);
            }
        });
    }
    else {
        res.status(400).json("No companyCategory id");
    }
};


exports.getCompanyCategoryCompanies = function (req,res) {
    if (req.body._id) {
        CompanyCategory.findOne({'_id': req.body._id}, function (err, companyCategory) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!companyCategory) {
                res.status(400).json("Invalid companyCategory id");
            }
            else {
                Company.find({'_id': {$in: companyCategory._companies}}, function (err, companies) {
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
        res.status(400).json("No companyCategory id");
    }
    // if(req.body.companyCategory) {
    //     CompanyCategory.findOne({"name":req.body.companyCategory},function (err,companyCategory) {
    //         if(err) {
    //             res.status(500).json("An error occurred");
    //         }
    //         else if(!companyCategory) {
    //             res.status(400).json("Selected company category doesn't exist");
    //         }
    //         else {
    //             let querry = companyCategory.select('_companies - _id');
    //             querry.exec(function (err,companies) {
    //                 if(err) {
    //                      res.status(500).json("An error occurred");
    //                 }
    //                 else if(!companies) {
    //                     res.status(400).json("There are no companies for selected category");
    //                 }
    //                 else {
    //                     res.send(companies);
    //                 }
    //
    //             });
    //         }
    //     });
    // }
    // else {
    //     res.status(400).json("");
    // }

};

exports.getCompanyCategoryProductCategories = function (req, res) {
    if (req.body._id) {
        CompanyCategory.findOne({'_id': req.body._id}, function (err, companyCategory) {
            if (err) {
                res.status(500).json("An error occurred");
            }
            else if (!companyCategory) {
                res.status(400).json("Invalid companyCategory id");
            }
            else {
                ProductCategory.find({'_id': {$in: companyCategory._productCategories}}, function (err, productCategories) {
                    if (err) {
                        res.status(500).json("An error occurred");
                    }
                    else {
                        res.status(200).json(productCategories);
                    }
                });
            }
        });
    }
    else {
        res.status(400).json("No companyCategory id");
    }
};