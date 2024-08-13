import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
import { currencybro } from '../Images';
import CustomButton from "../Components/CustomButton";
import '../Stylings/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

const Home = () => {
    const navigate = useNavigate();
    const [fundraisers, setFundraisers] = useState([]);

    const handleStartedClick = () => {
        navigate('/RiseNow');
    }

    useEffect(() => {
        async function fetchFundraisers() {
            try {
                const response = await axios.get('/api/users/fundraisers');
                setFundraisers(response.data.slice(0, 3)); // Get only the first 3 fundraisers
            } catch (error) {
                console.error('Error fetching fundraisers:', error);
            }
        }
        fetchFundraisers();
    }, []);

    return (
        <>
            <NavbarComponent />
            <Container fluid className="main-content mt-5">
                <Row className="align-items-center mb-5">
                    <Col md={8}>
                        <p>CrowdFund is dedicated to helping individuals and organizations raise funds for their causes. Whether you're looking to start a new project or support an existing one, we provide the tools and resources you need to make a difference.</p>
                    </Col>
                    <Col sm={4}>
                        <img src={currencybro} alt="About CrowdFund" className="img-fluid rounded" />
                    </Col>
                </Row>

                <h2 className="text-center mb-4">Active Fundraisers</h2>
                <Row className="mb-5">
                    {fundraisers.map(fundraiser => (
                        <Col md={4} className="mb-4" key={fundraiser._id}>
                            <Card className="shadow-sm custom-card">
                                <Card.Img variant="top" src={fundraiser.imageUrl} className="custom-card-img" />
                                <Card.Body>
                                    <Card.Title>{fundraiser.title}</Card.Title>
                                    <Card.Text>{fundraiser.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                <Row className="text-center bg-white py-5">
                    <Col>
                        <h2>Join the Movement</h2>
                        <p>Be a part of something bigger. Start your own fundraiser or support one today!</p>
                        <CustomButton onClick={handleStartedClick} style={{backgroundColor: '#463F3A', border: 'none'}}>Get Started</CustomButton>
                    </Col>
                </Row>
            </Container>
            <FooterComponent />
        </>
    );
};

export default Home;
