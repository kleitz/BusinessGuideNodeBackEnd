const mongoose = require('mongoose');

let ProductCategorySchema  = mongoose.Schema( {
    name: String,
    _companies: [{type:mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    _products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    _companyCategory: {type: mongoose.Schema.Types.ObjectId, ref: "CompanyCategory"},
    description: String
});

ProductCategory = mongoose.model('ProductCategory',ProductCategorySchema);

module.exports=ProductCategory;