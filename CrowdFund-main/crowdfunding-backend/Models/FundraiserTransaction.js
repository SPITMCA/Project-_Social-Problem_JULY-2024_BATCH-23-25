const mongoose = require('mongoose');

const fundraiserTransactionSchema = new mongoose.Schema({
    fundraiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const FundraiserTransaction = mongoose.model('FundraiserTransaction', fundraiserTransactionSchema);
module.exports = FundraiserTransaction;
