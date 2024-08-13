const { Parser } = require('json2csv');
const FundraiserTransaction = require('../Models/FundraiserTransaction');
const Fundraiser = require('../Models/Fundraiser');
const moment = require('moment');  // Import moment for date formatting

const contributeToFundraiser = async (req, res) => {
    const { fundraiserId, userId, amount } = req.body;

    try {
        // Validate the input
        if (!fundraiserId || !userId || !amount || amount <= 0) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Find the fundraiser
        const fundraiser = await Fundraiser.findById(fundraiserId);
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        // Create a new transaction
        const transaction = new FundraiserTransaction({
            fundraiserId,
            userId,
            amount,
        });

        // Save the transaction
        await transaction.save();

        // Update the current amount in the fundraiser
        fundraiser.currentAmount += amount;
        await fundraiser.save();

        res.status(201).json({ message: 'Contribution successful', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error processing contribution', error });
    }
};

const exportFundraiserTransactions = async (req, res) => {
    const { fundraiserId } = req.params;

    try {
        const fundraiser = await Fundraiser.findById(fundraiserId);
        if (!fundraiser || fundraiser.status !== 'approved') {
            return res.status(404).json({ message: 'Fundraiser not found or not approved' });
        }

        const transactions = await FundraiserTransaction.find({ fundraiserId });

        // Format the transactions data if needed
        const formattedTransactions = transactions.map(transaction => ({
            date: moment(transaction.date).format('YYYY-MM-DD'),  // Format date
            userId: transaction.userId,
            amount: transaction.amount
        }));

        const fields = ['date', 'userId', 'amount'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(formattedTransactions);

        res.header('Content-Type', 'text/csv');
        res.attachment(`${fundraiser.title}-transactions.csv`);
        res.send(csv);
    } catch (error) {
        console.error('Error exporting transactions:', error);
        res.status(500).json({ message: 'Error generating CSV', error });
    }
};


module.exports = { contributeToFundraiser, exportFundraiserTransactions };

