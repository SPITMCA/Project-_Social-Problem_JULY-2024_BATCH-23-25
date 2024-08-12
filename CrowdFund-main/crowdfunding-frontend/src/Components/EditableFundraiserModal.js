import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditableFundraiserModal = ({ show, onHide, fundraiser, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [targetAmount, setTargetAmount] = useState(0);

    useEffect(() => {
        if (fundraiser) {
            setTitle(fundraiser.title);
            setDescription(fundraiser.description);
            setCategory(fundraiser.category);
            setTargetAmount(fundraiser.targetAmount);
        }
    }, [fundraiser]);

    if (!fundraiser) return null;

    const handleSave = async () => {
        const updatedFundraiser = {
            ...fundraiser,
            title,
            description,
            category,
            targetAmount,
        };

        try {
            const response = await axios.put(`/api/users/fundraisers/${fundraiser._id}`, updatedFundraiser, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } // Include the token in the headers
            });
            console.log('Updated Fundraiser:', response.data);
            if (onUpdate) {
                onUpdate(response.data);
            }
            onHide();
        } catch (error) {
            console.error('Error updating fundraiser:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Fundraiser</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFundraiserTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFundraiserDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFundraiserCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFundraiserTargetAmount">
                        <Form.Label>Target Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter target amount"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSave} style={{backgroundColor: '#463F3A', border: 'none'}}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditableFundraiserModal;
