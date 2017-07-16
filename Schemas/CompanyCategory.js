const mongoose = require('mongoose');

let CompanyCategorySchema  = mongoose.Schema( {
    name: String,
    _companies: [{type:mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    _productCategories: [{type:mongoose.Schema.Types.ObjectId,ref: 'ProductCategory'}],
    description: String
});

CompanyCategory = mongoose.model('CompanyCategory',CompanyCategorySchema);

module.exports=CompanyCategory;