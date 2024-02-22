import React, { useState, useEffect } from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import axios from 'axios';
import Navbar_Restaurant from "../../components/Navbar_Restaurant";

const RestaurantSalesPage = () => {
  const [orderVolume, setOrderVolume] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [filter, setFilter] = useState('Days');
  const [mostPopularItem, setMostPopularItem] = useState(null);
  const restaurantId = localStorage.getItem("restaurant_id");

  useEffect(() => {
    fetchData();
  }, [filter]); // Fetch data whenever filter changes

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4010/api/order/restaurant/orders/${restaurantId}`);
      const orders = response.data;
      const filteredOrders = filterOrdersByDate(orders);
      const volume = calculateOrderVolume(filteredOrders);
      const earn = calculateTotalEarn(filteredOrders);
      calculateMostPopularItem(filteredOrders).then(popularItem => setMostPopularItem(popularItem));
      setOrderVolume(volume);
      setTotalEarn(earn);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterOrdersByDate = (orders) => {
    const currentDate = new Date();
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.date);
      switch (filter) {
        case 'Days':
          return orderDate.getDate() === currentDate.getDate();
        case 'Weeks':
          return orderDate >= new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Orders within the last 7 days
        case 'Months':
          return orderDate.getMonth() === currentDate.getMonth();
        default:
          return true; // Return all orders if filter is not specified
      }
    });
    return filteredOrders;
  };

  const calculateOrderVolume = (orders) => {
    return orders.length;
  };

  const calculateTotalEarn = (orders) => {
    return orders.reduce((total, order) => total + order.total_price, 0);
  };

  const calculateMostPopularItem = async (orders) => {
    const itemCounts = orders.reduce((counts, order) => {
      order.food_items.forEach(item => {
        if (!counts[item.food_id]) {
          counts[item.food_id] = 0;
        }
        counts[item.food_id]++;
      });
      return counts;
    }, {});
  
    let mostPopularItemId = null;
    let maxCount = 0;
  
    for (const itemId in itemCounts) {
      if (itemCounts[itemId] > maxCount) {
        mostPopularItemId = itemId;
        maxCount = itemCounts[itemId];
      }
    }
  
    if (mostPopularItemId) {
      try {
        const response = await axios.get(`http://localhost:4010/api/order/user/food/${mostPopularItemId}`);
        return response.data.name;
      } catch (error) {
        console.error("Error fetching food item:", error);
      }
    }
  
    return null;
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div>
      <Navbar_Restaurant />
      <div div className="container" style={{ position: "relative", top: "100px" }}>
        <Row>
          <Col md={12}>
            <div className="sticky-top" >
              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{background:"#ff8a00",border:"none"}}>
                  {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilter('Days')}>Days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('Weeks')}>Weeks</Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter('Months')}>Months</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-3 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Order Volume</Card.Title>
                <Card.Text>{orderVolume}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Total Earn</Card.Title>
                <Card.Text>BDT {totalEarn}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-3 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Popular Item</Card.Title>
                <Card.Text>{mostPopularItem}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Customer Complain</Card.Title>
                <Card.Text>NAI</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Pending Orders</Card.Title>
                <Card.Text>2</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-4 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Rejected Orders</Card.Title>
                <Card.Text>2</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RestaurantSalesPage;
