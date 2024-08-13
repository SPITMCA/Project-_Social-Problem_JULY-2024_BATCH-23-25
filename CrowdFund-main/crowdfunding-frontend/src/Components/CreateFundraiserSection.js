import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import CustomButton from "./CustomButton";

axios.defaults.baseURL = 'http://localhost:5000';

const CreateFundraiserSection = ({ onAddFundraiser }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Health');
    const [targetAmount, setTargetAmount] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description || !targetAmount || !image) {
            alert('Please fill out all fields and upload an image.');
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            console.log('JWT Token:', token); // Debugging statement

            if (!token) {
                alert('User not authenticated');
                return;
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Debugging statement

            const userId = decodedToken.id; // Assuming the user ID is stored in the 'id' field of the token

            const formData = new FormData();
            formData.append('image', image);

            // Upload the image
            const imageResponse = await axios.post('/api/users/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });

            const imageUrl = imageResponse.data.imageUrl;

            const newFundraiser = {
                title,
                description,
                category,
                targetAmount,
                imageUrl,
                requestedUserId: userId, // Add the current user's ID
                status: 'pending', // Default status
                currentAmount: 0 // Default current amount
            };

            // Create the fundraiser
            const response = await axios.post('/api/users/fundraisers', newFundraiser, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            onAddFundraiser(response.data);

            // Reset form fields
            setTitle('');
            setDescription('');
            setCategory('Health');
            setTargetAmount('');
            setImage(null);
        } catch (error) {
            console.error('Error creating fundraiser:', error);
            alert('An error occurred while creating the fundraiser.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="create-fundraiser-section p-3">
            <h5>Create Your Own Fundraiser</h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="fundraiserTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="fundraiserDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="fundraiserCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Health</option>
                        <option>Education</option>
                        <option>Environment</option>
                        <option>Community</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="targetAmount">
                    <Form.Label>Target Amount (in Rupees)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter target amount in INR"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="imageUpload">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <div className="mt-3">
                    <CustomButton className="custom-button custom-button-small" type="submit">Create Fundraiser</CustomButton>
                </div>
            </Form>
        </div>
    );
};

export default CreateFundraiserSection;
