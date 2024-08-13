import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
// import { useNavigate } from 'react-router-dom';
// import FundraiserDetailsModal from '../Components/FundraiserDetailsModal';
import EditableFundraiserModal from '../Components/EditableFundraiserModal';
import axios from 'axios';

const MyRequests = () => {
    // const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedFundraiser, setSelectedFundraiser] = useState(null);
    const [fundraisers, setFundraisers] = useState([]);
    const token = sessionStorage.getItem('token'); // Retrieve the token from sessionStorage
    console.log(token);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/users/my-fundraisers', {
                    headers: { 'Authorization': `Bearer ${token}` } // Include the token in the headers
                });

                console.log('Fundraisers:', response.data); // Debugging line
                setFundraisers(response.data);
            } catch (error) {
                console.error('Error fetching user fundraisers:', error.response ? error.response.data : error.message);
            }
        }
        fetchData();
    }, [token]);

    const handleShowDetails = (fundraiser) => {
        setSelectedFundraiser(fundraiser);
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/fundraisers/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` } // Include the token in the headers
            });
            const updatedFundraisers = fundraisers.filter(fundraiser => fundraiser._id !== id);
            setFundraisers(updatedFundraisers);
        } catch (error) {
            console.error('Error deleting fundraiser:', error);
        }
    };

    return (
        <div id="root">
            <NavbarComponent />
            <Container fluid className="main-content">
                <Row className="my-4">
                    <Col md={12}>
                        <h2>My Fundraisers</h2>
                        <div className="d-flex flex-wrap">
                            {fundraisers.length > 0 ? (
                                fundraisers.map(fundraiser => (
                                    <Card key={fundraiser._id} style={{ width: '18rem', margin: '10px' }} className="d-flex flex-column justify-content-between">
                                        <Card.Img variant="top" src={fundraiser.imageUrl} alt='Fundraiser' />
                                        <Card.Body className="d-flex flex-column">
                                            <b><Card.Title>{fundraiser.title}</Card.Title></b>
                                            <Card.Text>{fundraiser.description}</Card.Text>
                                            <Card.Text><strong>Status:</strong> {fundraiser.status}</Card.Text>
                                            {fundraiser.rejectedComment && (
                                                <Card.Text><strong>Comments:</strong> {fundraiser.rejectedComment}</Card.Text>
                                            )}
                                            <div className="mt-auto d-flex justify-content-center">
                                                <Button variant="primary" className="me-2" onClick={() => handleShowDetails(fundraiser)} style={{ backgroundColor: '#463F3A', border: 'none' }}>View Details</Button>
                                                <Button variant="primary" className="me-2" onClick={() => handleDelete(fundraiser._id)} style={{ backgroundColor: '#463F3A', border: 'none' }}>Delete</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No fundraisers found.</p>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
            <FooterComponent />
            <EditableFundraiserModal 
                show={showModal} 
                onHide={handleHideModal} 
                fundraiser={selectedFundraiser} 
            />
        </div>
    );
};

export default MyRequests;
