const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
    userName: {
        type: String,
        unique: true, 
        required: true, 
        trim: true
    },
    email: {
        type: String, 
        unique: true,
        required: true, 
        //regex
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    },
    {
        toJSON: {
            virtuals: true ,
            getter: true,
        },
        id: false 
    }
    
)

//get total count of friends 
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

//create total count of friends 
const user = model('user', userSchema);

module.exports = user;