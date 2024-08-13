import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import NavbarComponent from '../Components/NavbarComponent';
import FooterComponent from '../Components/FooterComponent';
import '../Stylings/AdminApproval.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminApproval = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const [error, setError] = useState('');
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);
  const [comment, setComment] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const fetchPendingFundraisers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/fundraisers/pending');
        setFundraisers(response.data);
      } catch (err) {
        setError('Failed to fetch pending fundraisers');
      }
    };

    fetchPendingFundraisers();
  }, []);
  

  const handleAction = async (id, action) => {
    try {
      let endpoint;
      if (action === 'approve') {
        endpoint = `http://localhost:5000/api/users/fundraisers/${id}/approve`;
      } else if (action === 'decline') {
        endpoint = `http://localhost:5000/api/users/fundraisers/${id}/decline`;
      } else if (action === 'suggest-changes') {
        endpoint = `http://localhost:5000/api/users/fundraisers/${id}/suggest-changes`;
      }

      await axios.post(endpoint, { rejectedComment: comment });
      setFundraisers(fundraisers.filter(fundraiser => fundraiser._id !== id));
      setComment('');
      setActionMessage(`Action ${action} was performed successfully`);
      setTimeout(() => setActionMessage(''), 3000);
    } catch (err) {
      setError('Failed to perform action');
    }
  };

  return (
    <div className="admin-approval-wrapper">
      <NavbarComponent />
      <Container className="content-container">
        <h1>Admin Approval</h1>
        {error && <p className="text-danger">{error}</p>}
        {actionMessage && <p className="text-success">{actionMessage}</p>}
        <Row>
          {fundraisers.map((fundraiser) => (
            <Col md={4} key={fundraiser._id}>
              <Card className='card-img-top'>
                <Card.Img
                  variant="top"
                  src={fundraiser.imageUrl}
                  alt={fundraiser.title}
                  className="custom-image" // Apply custom CSS class
                />
                <Card.Body>
                  <Card.Title>{fundraiser.title}</Card.Title>
                  <Card.Text>{fundraiser.description}</Card.Text>
                  <Card.Text>Target Amount: ${fundraiser.targetAmount}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleAction(fundraiser._id, 'approve')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleAction(fundraiser._id, 'decline')}
                  >
                    Decline
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setSelectedFundraiser(fundraiser._id);
                    }}
                  >
                    Suggest Changes
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {selectedFundraiser && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAction(selectedFundraiser, 'suggest-changes');
              setSelectedFundraiser(null);
            }}
          >
            <Form.Group controlId="comment">
              <Form.Label>Suggest Changes</Form.Label>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comments here"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedFundraiser(null);
                setComment('');
              }}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Container>
      <FooterComponent />
    </div>
  );
};

export default AdminApproval;
