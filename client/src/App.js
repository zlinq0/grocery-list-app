import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GroceryList from './components/GroceryList';
import GroceryForm from './components/GroceryForm';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaShoppingBasket } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [frequencyFilter, setFrequencyFilter] = useState('all');

  // Fetch all grocery items
  const fetchGroceries = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/groceries');
      setGroceries(res.data);
      setError(null);
    } catch (err) {
      setError('Error fetching grocery items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new grocery item
  const addGroceryItem = async (item) => {
    try {
      const res = await axios.post('/api/groceries', item);
      setGroceries([res.data, ...groceries]);
    } catch (err) {
      setError('Error adding grocery item');
      console.error(err);
    }
  };

  // Update a grocery item
  const updateGroceryItem = async (id, updatedItem) => {
    try {
      const res = await axios.put(`/api/groceries/${id}`, updatedItem);
      setGroceries(
        groceries.map((item) => (item._id === id ? res.data : item))
      );
      setEditItem(null);
    } catch (err) {
      setError('Error updating grocery item');
      console.error(err);
    }
  };

  // Delete a grocery item
  const deleteGroceryItem = async (id) => {
    try {
      await axios.delete(`/api/groceries/${id}`);
      setGroceries(groceries.filter((item) => item._id !== id));
    } catch (err) {
      setError('Error deleting grocery item');
      console.error(err);
    }
  };

  // Toggle purchased status
  const togglePurchased = async (id, purchased) => {
    try {
      const res = await axios.put(`/api/groceries/${id}`, { purchased: !purchased });
      setGroceries(
        groceries.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      setError('Error updating grocery item');
      console.error(err);
    }
  };

  // Set item to edit
  const editGroceryItem = (item) => {
    setEditItem(item);
  };

  // Load groceries when component mounts
  useEffect(() => {
    fetchGroceries();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <Container>
          <div className="d-flex align-items-center justify-content-center">
            <FaShoppingBasket size={30} className="me-2" />
            <h1 className="app-title">Grocery List</h1>
          </div>
        </Container>
      </header>
      
      <Container>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Row>
          <Col lg={4} md={5}>
            <Card className="mb-4 sticky-top" style={{ top: '20px' }}>
              <Card.Body>
                <Card.Title>
                  {editItem ? (
                    <span>✏️ Edit Item</span>
                  ) : (
                    <span>➕ Add New Item</span>
                  )}
                </Card.Title>
                <GroceryForm 
                  addGroceryItem={addGroceryItem} 
                  updateGroceryItem={updateGroceryItem}
                  editItem={editItem}
                />
                {editItem && (
                  <button 
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => setEditItem(null)}
                  >
                    Cancel Editing
                  </button>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={8} md={7}>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>Your Grocery Items</span>
                  {groceries.length > 0 && (
                    <small className="text-muted">
                      {groceries.filter(item => item.purchased).length} of {groceries.length} purchased
                    </small>
                  )}
                </Card.Title>
                
                <div className="frequency-filter mb-3">
                  <div className="d-flex justify-content-center">
                    <div className="btn-group" role="group">
                      <button 
                        type="button" 
                        className={`btn ${frequencyFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFrequencyFilter('all')}
                      >
                        All Items
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${frequencyFilter === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFrequencyFilter('daily')}
                      >
                        Daily
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${frequencyFilter === 'weekend' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFrequencyFilter('weekend')}
                      >
                        Weekend
                      </button>
                      <button 
                        type="button" 
                        className={`btn ${frequencyFilter === 'monthly' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFrequencyFilter('monthly')}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>
                </div>
                
                <GroceryList 
                  groceries={frequencyFilter === 'all' 
                    ? groceries 
                    : groceries.filter(item => item.frequency === frequencyFilter)} 
                  loading={loading}
                  deleteGroceryItem={deleteGroceryItem}
                  editGroceryItem={editGroceryItem}
                  togglePurchased={togglePurchased}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
