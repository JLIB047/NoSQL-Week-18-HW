const { Schema, model } = require('mongoose');

const userSchema = new Schema (
    {
    username: {
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
    thought: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
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
const User = model('User', userSchema);

module.exports = User;