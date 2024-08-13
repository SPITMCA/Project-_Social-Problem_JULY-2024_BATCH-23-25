import React, { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar, Form } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const FundraiserDetailsModal = ({ show, onHide, fundraiser }) => {
    const [contributionAmount, setContributionAmount] = useState('');
    const [localRaisedAmount, setLocalRaisedAmount] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (fundraiser) {
            updateProgress();
        }
    }, [fundraiser, localRaisedAmount]);

    if (!fundraiser) return null;

    const raisedAmount = parseFloat(fundraiser.currentAmount) || 0;
    const targetAmount = parseFloat(fundraiser.targetAmount) || 0;

    const updateProgress = () => {
        const totalRaised = raisedAmount + localRaisedAmount;
        const newProgress = targetAmount > 0 ? (totalRaised / targetAmount) * 100 : 0;
        setProgress(newProgress);
    };

    const handlePay = async () => {
        const amount = parseFloat(contributionAmount);
        if (amount && !isNaN(amount) && amount > 0) {
            try {
                // Decode JWT to get the user ID
                const token = sessionStorage.getItem('token'); // Or however you store the token
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                // Send contribution data to the backend
                await axios.post('/api/users/contribute', {
                    fundraiserId: fundraiser._id,
                    userId: userId,
                    amount: amount
                });

                // Update local state
                setLocalRaisedAmount(prevAmount => prevAmount + amount);
                alert('Thank you for supporting!');
                setContributionAmount('');
                onHide(); // Close the modal after contribution
            } catch (error) {
                console.error('Error making contribution:', error);
                alert('An error occurred while processing your contribution.');
            }
        } else {
            alert('Please enter a valid amount.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{fundraiser.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={fundraiser.imageUrl} alt={fundraiser.title} className="img-fluid mb-3" />
                <p><strong>Description:</strong> {fundraiser.description}</p>
                <p><strong>Category:</strong> {fundraiser.category}</p>
                <p><strong>Target Amount:</strong> ₹{targetAmount.toFixed(2)}</p>
                <p><strong>Amount Raised:</strong> ₹{(raisedAmount + localRaisedAmount).toFixed(2)}</p>

                <ProgressBar 
                    now={progress} 
                    label={`${Math.round(progress)}%`} 
                    className="mb-3"
                    style={{ backgroundColor: '#e9ecef' }}
                >
                    <ProgressBar 
                        now={progress} 
                        label={`${Math.round(progress)}%`} 
                        style={{ backgroundColor: '#463F3A' }}
                    />
                </ProgressBar>
                <Form.Group controlId="formContributionAmount">
                    <Form.Label>Amount to Contribute</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handlePay} className="mt-3" style={{backgroundColor: '#463F3A', border: 'none'}}>
                    Pay
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FundraiserDetailsModal;
