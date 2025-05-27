import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FaPlus, FaSave, FaShoppingCart } from 'react-icons/fa';

const GroceryForm = ({ addGroceryItem, updateGroceryItem, editItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    unit: 'item',
    category: 'general',
    frequency: 'daily'
  });

  // Update form when editItem changes
  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        quantity: editItem.quantity,
        unit: editItem.unit,
        category: editItem.category,
        frequency: editItem.frequency || 'daily'
      });
    } else {
      // Reset form when not editing
      setFormData({
        name: '',
        quantity: 1,
        unit: 'item',
        category: 'general',
        frequency: 'daily'
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      return;
    }
    
    if (editItem) {
      updateGroceryItem(editItem._id, formData);
    } else {
      addGroceryItem(formData);
      // Reset form after adding
      setFormData({
        name: '',
        quantity: 1,
        unit: 'item',
        category: 'general'
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="grocery-form">
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaShoppingCart />
          </InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
            autoFocus
            required
          />
        </InputGroup>
      </Form.Group>

      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="text-center"
            />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="unit-select"
            >
              <option value="item">Item</option>
              <option value="kg">Kg</option>
              <option value="g">g</option>
              <option value="lb">lb</option>
              <option value="oz">oz</option>
              <option value="l">L</option>
              <option value="ml">ml</option>
              <option value="dozen">Dozen</option>
              <option value="pack">Pack</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="category-select"
            >
              <option value="general">General</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="bakery">Bakery</option>
              <option value="frozen">Frozen</option>
              <option value="canned">Canned</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-4">
            <Form.Label>Shopping Frequency</Form.Label>
            <Form.Select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="frequency-select"
            >
              <option value="daily">Daily</option>
              <option value="weekend">Weekend</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Button 
        variant="primary" 
        type="submit" 
        className="w-100 d-flex align-items-center justify-content-center"
      >
        {editItem ? (
          <>
            <FaSave className="me-2" />
            Save Changes
          </>
        ) : (
          <>
            <FaPlus className="me-2" />
            Add to List
          </>
        )}
      </Button>
    </Form>
  );
};

export default GroceryForm;
