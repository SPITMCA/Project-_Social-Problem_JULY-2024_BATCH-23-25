import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
import CreateFundraiserSection from "../Components/CreateFundraiserSection";
import '../Stylings/FundraiserForm.css';

const FundraiserForm = () => {
    const navigate = useNavigate();
    const handleAddFundraiser = (newFundraiser) => {
        // Navigate to the previous page and add the new fundraiser
        navigate('/RiseNow', { state: { newFundraiser } });
    };

    return (
        <div id="root">
            <NavbarComponent/>
            <Container fluid className="main-content">
                <CreateFundraiserSection onAddFundraiser={handleAddFundraiser} />
            </Container>
            <FooterComponent className="sticky-footer"/>
        </div>
    );
};

export default FundraiserForm;
