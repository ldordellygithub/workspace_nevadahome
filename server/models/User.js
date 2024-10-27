const  mongoose = require('mongoose');


const  userShemaNevada  =   new  mongoose.Schema({

    uid: {
        type: String,
        required: true,
        unique: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    role:{
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },

    createAt: {
        type: Date,
        default: Date.now,
    },
});


// export  modelo  de  usuario

const  User  = mongoose.model('UserNevada',userShemaNevada);
module.exports =  User;