import React, { useState, useEffect ,useRef} from "react";
import { Card, Row, Col, Dropdown } from "react-bootstrap";
import axios from 'axios';
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const RestaurantSalesPage = () => {
  const [orderVolume, setOrderVolume] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [filter, setFilter] = useState('Days');
  const [mostPopularItem, setMostPopularItem] = useState(null);
  const restaurantId = localStorage.getItem("restaurant_id");

  const [orderData, setOrderData] = useState([]);
  const orderVolumeChartRef = useRef(null);
  const totalEarnChartRef = useRef(null);
  const orderVolumeChartInstance = useRef(null);
  const totalEarnChartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, [filter]); // Fetch data whenever filter changes

  useEffect(() => {
    if (orderVolumeChartRef.current && totalEarnChartRef.current) {
      if (orderVolumeChartInstance.current) {
        orderVolumeChartInstance.current.destroy();
      }
      if (totalEarnChartInstance.current) {
        totalEarnChartInstance.current.destroy();
      }
      orderVolumeChartInstance.current = renderOrderVolumeChart(orderVolumeChartRef.current, orderData);
      totalEarnChartInstance.current = renderTotalEarnChart(totalEarnChartRef.current, orderData);
    }
  }, [orderData]);

  const renderOrderVolumeChart = (canvas, data) => {
    const labels = data.map(entry => entry.date);
    const volumes = data.map(entry => entry.orderVolume);

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Order Volume',
          data: volumes,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const renderTotalEarnChart = (canvas, data) => {
    const labels = data.map(entry => entry.date);
    const earnings = data.map(entry => entry.totalEarn);

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Earn',
          data: earnings,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

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

      const filteredOrders2 = filterOrdersByDate2(orders);
      const processedData = processData(filteredOrders2);
      setOrderData(processedData);

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

  const filterOrdersByDate2 = (orders) => {
    const currentDate = new Date();
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      switch (filter) {
        case 'Days':
          return orderDate.getDate() === currentDate.getDate() &&
                 orderDate.getMonth() === currentDate.getMonth() &&
                 orderDate.getFullYear() === currentDate.getFullYear();
        case 'Weeks':
          return isSameWeek(orderDate, currentDate);
        case 'Months':
          return orderDate.getMonth() === currentDate.getMonth() &&
                 orderDate.getFullYear() === currentDate.getFullYear();
        default:
          return true; // Return all orders if filter is not specified
      }
    });
  };

  const isSameWeek = (date1, date2) => {
    const diff = Math.abs(date1 - date2);
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    return diff <= millisecondsInWeek;
  };

  const processData = (orders) => {
    const groupedData = {};
    orders.forEach(order => {
      const orderDate = new Date(order.date);
      const formattedDate = `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = {
          date: formattedDate,
          orderVolume: 0,
          totalEarn: 0
        };
      }
      groupedData[formattedDate].orderVolume++;
      groupedData[formattedDate].totalEarn += order.total_price;
    });
    return Object.values(groupedData);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div >
      <Navbar_Restaurant />
      <div div className="container" style={{ position: "relative", top: "100px" }}>
        <Row>
          <Col md={12}>
            <div>
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
                <Card.Title>Order Graph</Card.Title>
                <canvas ref={orderVolumeChartRef}></canvas>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4 mt-3 p-3 text-center shadow" style={{ borderRadius: '15px' }}>
              <Card.Body>
                <Card.Title>Total Earning Graph</Card.Title>
                <canvas ref={totalEarnChartRef}></canvas>
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
