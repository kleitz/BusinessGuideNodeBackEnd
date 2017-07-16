const mongoose = require('mongoose');

let ProductSchema  = mongoose.Schema( {
    name: String,
    description: String,
    _companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    _discountCompanies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}],
    _productCategory: {type:mongoose.Schema.Types.ObjectId, ref: 'ProductCategory'},
    price : Number
});

Product = mongoose.model('Product',ProductSchema);

module.exports=Product;