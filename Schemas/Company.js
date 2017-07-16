const mongoose = require('mongoose');

let CompanySchema = mongoose.Schema({
    name: String,
    email: String,
    _companyCategory: {type:mongoose.Schema.Types.ObjectId, ref: 'CompanyCategory'},
    //_headquarters:{type: mongoose.Schema.Types.ObjectId, ref: 'Department'},
    headquarters: {
        address: String,
        phone_number: String,
        latitude: String,
        longitude: String
    },
    //_departments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Department'}],
    departments: [{
        address: String,
        phone_number: String,
        latitude: String,
        longitude: String
    }],
    _productCategories:[{type: mongoose.Schema.Types.ObjectId, ref:'ProductCategory'}],
    _products: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    _discountProducts: [{type:mongoose.Schema.Types.ObjectId, ref: 'Product'}]

});
Company = mongoose.model('Company',CompanySchema);

module.exports=Company;