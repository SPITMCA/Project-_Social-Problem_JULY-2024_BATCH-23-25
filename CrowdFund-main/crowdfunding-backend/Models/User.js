const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); // Remove if not using bcrypt

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular',
    },
});

// Remove or comment out the pre-save hook
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
