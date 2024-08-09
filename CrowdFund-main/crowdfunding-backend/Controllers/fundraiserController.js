const Fundraiser = require('../Models/Fundraiser');

const createFundraiser = async (req, res) => {
    const { title, description, category, targetAmount, imageUrl, requestedUserId } = req.body;

    try {
        // Check if requestedUserId is provided
        if (!requestedUserId) {
            return res.status(400).json({ message: 'requestedUserId is required' });
        }

        const fundraiser = new Fundraiser({
            title,
            description,
            category,
            targetAmount,
            imageUrl,
            requestedUserId,  // Add requestedUserId here
        });

        await fundraiser.save();
        res.status(201).json(fundraiser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating fundraiser', error });
    }
};

const fetchFundraiser = async (req, res) => {
    try {
        // Fetch all fundraisers from the database
        const fundraisers = await Fundraiser.find();

        // Send the fundraisers in the response
        res.status(200).json(fundraisers);
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        res.status(500).json({ message: 'Error fetching fundraisers', error });
    }
};

const fetchPendingFundraisers = async (req, res) => {
    try {
        const fundraisers = await Fundraiser.find({ status: 'pending' });
        res.status(200).json(fundraisers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending fundraisers', error });
    }
};

const deleteFundraiser = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the fundraiser by ID and delete it
        const deletedFundraiser = await Fundraiser.findByIdAndDelete(id);

        if (!deletedFundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        res.status(200).json({ message: 'Fundraiser deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the delete operation
        res.status(500).json({ message: 'Error deleting fundraiser', error });
    }
};

const approveFundraiser = async (req, res) => {
    const { id } = req.params;
    try {
        const fundraiser = await Fundraiser.findById(id);
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        fundraiser.status = 'approved';
        await fundraiser.save();
        res.status(200).json({ message: 'Fundraiser approved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Decline a fundraiser
const declineFundraiser = async (req, res) => {
    const { id } = req.params;
    try {
        const fundraiser = await Fundraiser.findById(id);
        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        fundraiser.status = 'rejected';
        await fundraiser.save();
        res.status(200).json({ message: 'Fundraiser rejected successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Suggest changes for a fundraiser
const suggestChanges = async (req, res) => {
    const { id } = req.params;
    const { rejectedComment } = req.body;

    try {
        const fundraiser = await Fundraiser.findById(id);

        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        // Set the rejectedComment field and update status to 'pending'
        fundraiser.rejectedComment = rejectedComment;
        fundraiser.status = 'pending'; // Assuming you want to reset status to pending
        await fundraiser.save();

        res.status(200).json({ message: 'Changes suggested successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a fundraiser
const updateFundraiser = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, targetAmount, imageUrl } = req.body;

    try {
        const fundraiser = await Fundraiser.findById(id);

        if (!fundraiser) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        // Update the fields with the new data
        fundraiser.title = title || fundraiser.title;
        fundraiser.description = description || fundraiser.description;
        fundraiser.category = category || fundraiser.category;
        fundraiser.targetAmount = targetAmount || fundraiser.targetAmount;
        fundraiser.imageUrl = imageUrl || fundraiser.imageUrl;

        await fundraiser.save();
        res.status(200).json({ message: 'Fundraiser updated successfully', fundraiser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating fundraiser', error });
    }
};

module.exports = { createFundraiser, fetchFundraiser,fetchPendingFundraisers, deleteFundraiser, approveFundraiser, declineFundraiser, suggestChanges, updateFundraiser };
