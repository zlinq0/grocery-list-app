import React from 'react';
import { ListGroup, Button, Badge, Row, Col, Spinner } from 'react-bootstrap';
import { 
  FaEdit, 
  FaTrash, 
  FaCheck, 
  FaUndo, 
  FaAppleAlt, 
  FaCarrot, 
  FaCheese, 
  FaDrumstickBite, 
  FaBreadSlice, 
  FaSnowflake, 
  FaBoxOpen, 
  FaCoffee, 
  FaCookie, 
  FaHome, 
  FaShoppingBasket, 
  FaCalendarAlt, 
  FaTag 
} from 'react-icons/fa';

const GroceryList = ({ groceries, loading, deleteGroceryItem, editGroceryItem, togglePurchased }) => {
  // Get category icon based on category name
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'fruits':
        return <FaAppleAlt className="category-icon" />;
      case 'vegetables':
        return <FaCarrot className="category-icon" />;
      case 'dairy':
        return <FaCheese className="category-icon" />;
      case 'meat':
        return <FaDrumstickBite className="category-icon" />;
      case 'bakery':
        return <FaBreadSlice className="category-icon" />;
      case 'frozen':
        return <FaSnowflake className="category-icon" />;
      case 'canned':
        return <FaBoxOpen className="category-icon" />;
      case 'beverages':
        return <FaCoffee className="category-icon" />;
      case 'snacks':
        return <FaCookie className="category-icon" />;
      case 'household':
        return <FaHome className="category-icon" />;
      default:
        return <FaShoppingBasket className="category-icon" />;
    }
  };

  const getFrequencyBadgeColor = (frequency) => {
    switch(frequency) {
      case 'daily':
        return 'info';
      case 'weekend':
        return 'warning';
      case 'monthly':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (groceries.length === 0) {
    return (
      <ListGroup>
        <ListGroup.Item className="empty-list-message">
          <div className="text-center py-4">
            <FaShoppingBasket size={40} className="text-muted mb-3" />
            <h5>Your grocery list is empty</h5>
            <p className="text-muted">Add some items to get started!</p>
          </div>
        </ListGroup.Item>
      </ListGroup>
    );
  }

  // Sort categories in a specific order
  const categoryOrder = [
    'fruits', 'vegetables', 'dairy', 'meat', 'bakery', 'frozen', 
    'canned', 'beverages', 'snacks', 'household', 'general'
  ];

  // Group items by category
  const groupedGroceries = groceries.reduce((acc, item) => {
    const category = item.category || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Sort categories
  const sortedCategories = Object.keys(groupedGroceries).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.toLowerCase());
    const indexB = categoryOrder.indexOf(b.toLowerCase());
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <div className="grocery-list-container">
      {sortedCategories.map(category => (
        <div key={category} className="mb-4">
          <div className="category-header">
            <h5>{getCategoryIcon(category)} {category}</h5>
            <Badge bg="primary" pill>
              {groupedGroceries[category].length}
            </Badge>
          </div>
          <ListGroup>
          {groupedGroceries[category].map(item => (
            <ListGroup.Item
              key={item._id}
              className={`grocery-item ${item.purchased ? 'purchased' : ''}`}
            >
              <Row className="align-items-center">
                <Col xs={8} md={9}>
                  <div className="item-content">
                    <div className="item-name-container">
                      <FaShoppingBasket className="item-icon" />
                      <span className="item-name">{item.name}</span>
                    </div>
                    <div className="item-details">
                      <span className="quantity-unit">
                        <strong>{item.quantity}</strong> {item.unit}
                      </span>
                      <span className="category">
                        <FaTag size={12} className="mr-1" /> {category}
                      </span>
                      <span className="frequency">
                        <FaCalendarAlt size={12} className="mr-1" /> {item.frequency}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col xs={4} md={3}>
                  <div className="action-buttons">
                    <Button
                      variant={item.purchased ? "outline-success" : "success"}
                      size="sm"
                      onClick={() => togglePurchased(item._id, item.purchased)}
                      className="action-btn"
                      title={item.purchased ? "Mark as not purchased" : "Mark as purchased"}
                    >
                      {item.purchased ? <FaUndo /> : <FaCheck />}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => editGroceryItem(item)}
                      className="action-btn"
                      disabled={item.purchased}
                      title="Edit item"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteGroceryItem(item._id)}
                      className="action-btn"
                      title="Delete item"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          </ListGroup>
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
