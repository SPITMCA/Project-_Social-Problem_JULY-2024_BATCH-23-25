const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    currentAmount: { type: Number, default: 0 }, // Add currentAmount with default 0
    requestedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add requestedUserId as a reference to User
    approverUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add approverUserId as a reference to User
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Add status with enum
    rejectedComment: { type: String }, // Add rejectedComment
});

const Fundraiser = mongoose.model('Fundraiser', fundraiserSchema);
module.exports = Fundraiser;
