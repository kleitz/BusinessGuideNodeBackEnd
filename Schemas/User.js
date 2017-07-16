const mongoose = require('mongoose');

let UserSchema  = mongoose.Schema( {
    username: String,
    password: String,
    email: String,
    token: String,
    verified: Boolean,
    picture: String
});

User = mongoose.model('User',UserSchema);

module.exports=User;