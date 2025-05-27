import React from 'react';
import { ListGroup, Button, Spinner, Badge } from 'react-bootstrap';
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
  FaShoppingBasket 
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
      <div className="empty-list">
        <h4>Your grocery list is empty</h4>
        <p>Add some items to get started with your shopping</p>
      </div>
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
            {getCategoryIcon(category)}
            <span className="text-capitalize">{category}</span>
            <Badge bg="primary" pill className="ms-2">
              {groupedGroceries[category].length}
            </Badge>
          </div>
          <ListGroup>
            {groupedGroceries[category].map(item => (
              <ListGroup.Item 
                key={item._id} 
                className={`grocery-item d-flex justify-content-between align-items-center ${item.purchased ? 'purchased' : ''}`}
              >
                <div>
                  <span className="item-name">{item.name}</span>
                  <div className="item-details">
                    {item.quantity} {item.unit}
                    <span className="frequency-badge ms-2">
                      {item.frequency === 'daily' && <span className="badge bg-info">Daily</span>}
                      {item.frequency === 'weekend' && <span className="badge bg-warning">Weekend</span>}
                      {item.frequency === 'monthly' && <span className="badge bg-secondary">Monthly</span>}
                    </span>
                  </div>
                </div>
                <div className="action-buttons">
                  <Button 
                    variant={item.purchased ? "outline-success" : "success"} 
                    className="action-btn"
                    title={item.purchased ? "Mark as not purchased" : "Mark as purchased"}
                    onClick={() => togglePurchased(item._id, item.purchased)}
                  >
                    {item.purchased ? <FaUndo size={16} /> : <FaCheck size={16} />}
                  </Button>
                  <Button 
                    variant="info" 
                    className="action-btn"
                    title="Edit item"
                    onClick={() => editGroceryItem(item)}
                  >
                    <FaEdit size={16} />
                  </Button>
                  <Button 
                    variant="danger" 
                    className="action-btn"
                    title="Delete item"
                    onClick={() => deleteGroceryItem(item._id)}
                  >
                    <FaTrash size={16} />
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
