// FilterSection.js
import React from 'react';
import { Form } from 'react-bootstrap';

const FilterSection = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="filter-section p-3">
            <h5>Filter by Category</h5>
            <Form>
                <Form.Group controlId="filterCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Environment">Environment</option>
                        <option value="Community">Community</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
};

export default FilterSection;
