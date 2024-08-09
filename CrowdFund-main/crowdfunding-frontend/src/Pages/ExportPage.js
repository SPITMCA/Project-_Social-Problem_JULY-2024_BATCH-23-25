import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
import '../Stylings/ExportPage.css';

const ExportPage = () => {
    const [fundraisers, setFundraisers] = useState([]);
    const [selectedFundraiser, setSelectedFundraiser] = useState('');

    useEffect(() => {
        async function fetchFundraisers() {
            try {
                const response = await axios.get('/api/users/fundraisers');
                // Filter approved fundraisers
                const approvedFundraisers = response.data.filter(fundraiser => fundraiser.status === 'approved');
                setFundraisers(approvedFundraisers);
            } catch (error) {
                console.error('Error fetching fundraisers:', error);
            }
        }
        fetchFundraisers();
    }, []);

    const handleExport = async () => {
        try {
            const response = await axios.get(`/api/users/fundraisers/export/${selectedFundraiser}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fundraiser_transactions.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <div className="main-container">
            <NavbarComponent />
            <div className="content-container">
                <Container className="mt-5">
                    <Row>
                        <Col md={6}>
                            <h2>Export Fundraiser Transactions</h2>
                            <Form>
                                <Form.Group controlId="formFundraiserSelect">
                                    <Form.Label>Select Fundraiser</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setSelectedFundraiser(e.target.value)}>
                                        <option value="">-- Select Fundraiser --</option>
                                        {fundraisers.map(fundraiser => (
                                            <option key={fundraiser._id} value={fundraiser._id}>
                                                {fundraiser.title}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    onClick={handleExport}
                                    disabled={!selectedFundraiser}
                                >
                                    Export
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <FooterComponent />
        </div>
    );
};

export default ExportPage;
