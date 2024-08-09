import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FilterSection from '../Components/FilterSection';
import FundraiserDetailsModal from '../Components/FundraiserDetailsModal';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
import CustomButton from '../Components/CustomButton';
import '../Stylings/RiseNow.css';
import { competition } from '../Images';
import axios from 'axios';

const RiseNow = () => {
    const navigate = useNavigate();
    const [fundraisers, setFundraisers] = useState([]);
    const [selectedFundraiser, setSelectedFundraiser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Assuming you have a way to get the logged-in user ID, here it's hardcoded for demonstration.
    const userId = 'YOUR_USER_ID';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/users/fundraisers');
                setFundraisers(response.data);
            } catch (error) {
                console.error('Error fetching fundraisers:', error);
            }
        }
        fetchData();
    }, []);

    const handleShowDetails = (fundraiser) => {
        setSelectedFundraiser(fundraiser);
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleFundraiserForm = () => {
        navigate('/RaiserForm');
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredFundraisers = fundraisers
        .filter(fundraiser => fundraiser.status === 'approved') // Only approved fundraisers
        .filter(fundraiser => !selectedCategory || fundraiser.category === selectedCategory); // Filter by category if selected

    return (
        <div id="root">
            <NavbarComponent />
            <Container fluid className="main-content">
                <Row className="align-items-center my-4">
                    <Col md={6}>
                        <p>RiseNow is dedicated to helping individuals and organizations raise funds for their causes. Whether you're looking to start a new project or support an existing one, we provide the tools and resources you need to make a difference.</p>
                        <CustomButton className="custom-button custom-button-small" onClick={handleFundraiserForm}>Get Started</CustomButton>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <img src={competition} alt="About RiseNow" className="img-fluid" style={{ width: '300px' }} />
                    </Col>
                </Row>

                <Row>
                    <Col md={3} className="shadow-sm">
                        <FilterSection selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
                    </Col>
                    <Col md={9} className="shadow-sm">
                        <div className="d-flex flex-wrap">
                            {filteredFundraisers.map(fundraiser => (
                                <Card key={fundraiser._id} style={{ width: '18rem', margin: '10px' }} className="d-flex flex-column justify-content-between">
                                    <Card.Img variant="top" src={fundraiser.imageUrl} alt='hello' />
                                    <Card.Body className="d-flex flex-column">
                                        <b><Card.Title>{fundraiser.title}</Card.Title></b>
                                        <Card.Text>{fundraiser.description}</Card.Text>
                                        <div className="mt-auto d-flex justify-content-center">
                                            <Button variant="primary" className="me-2" onClick={() => handleShowDetails(fundraiser)} style={{ backgroundColor: '#463F3A', border: 'none' }}>View Details</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>

            <FundraiserDetailsModal show={showModal} onHide={handleHideModal} fundraiser={selectedFundraiser} userId={userId} />

            <FooterComponent />
        </div>
    );
};

export default RiseNow;
