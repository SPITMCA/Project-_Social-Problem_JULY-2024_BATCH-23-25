import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-bootstrap-icons';
import '../Stylings/Footer.css'

const FooterComponent = () => {
    return (
        <footer className="custom-footer text-white py-4">
            <Container>
                <Row className="text-center">
                    <Col>
                        <a href="https://facebook.com" className="text-white mx-2"><Facebook size={30} /></a>
                        <a href="https://twitter.com" className="text-white mx-2"><Twitter size={30} /></a>
                        <a href="https://instagram.com" className="text-white mx-2"><Instagram size={30} /></a>
                        <a href="https://linkedin.com" className="text-white mx-2"><Linkedin size={30} /></a>
                    </Col>
                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <p>&copy; {new Date().getFullYear()} CrowdFund. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterComponent;
