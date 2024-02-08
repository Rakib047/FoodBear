import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";

const RestaurantSalesPage = () => {
  // Dummy data representing restaurant sales information
  const salesData = [
    { name: "Burger", Earned: 4730 },
    { name: "Pizza", Earned: 5500 },
    { name: "Salad", Earned: 1890 },
    // Add more categories as needed
  ];

  // Dummy data representing how many times each food item was sold
  const foodSoldData = [
    { food: "Burger", count: 50 },
    { food: "Pizza", count: 70 },
    { food: "Salad", count: 30 },
    // Add more food items as needed
  ];

  // Dummy data representing monthly sales in BDT
  const monthlySalesData = [
    { month: "Aug", sales: 50000 },
    { month: "Sep", sales: 60000 },
    { month: "Oct", sales: 67000 },
    { month: "Nov", sales: 62000 },
    { month: "Dec", sales: 56000 },
    { month: "Jan", sales: 58000 },
    { month: "Feb", sales: 29000 },
    // Add more months as needed
  ];

  // Dummy data representing average order value for each month
  const averageOrderValueData = [
    { month: "Aug", averageOrder: 420 },
    { month: "Sep", averageOrder: 370 },
    { month: "Oct", averageOrder: 320 },
    { month: "Nov", averageOrder: 265 },
    { month: "Dec", averageOrder: 299 },
    { month: "Jan", averageOrder: 355 },
    { month: "Feb", averageOrder: 230 },
    // Add more months as needed
  ];

  // Colors for different categories
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Add more colors as needed
  const [isHoveredSales, setIsHoveredSales] = useState(false);
  const [isHoveredFood, setIsHoveredFood] = useState(false);
  const [isHoveredMonthlySales, setIsHoveredMonthlySales] = useState(false);
  const [isHoveredAvgOrderValue, setIsHoveredAvgOrderValue] = useState(false);

  const handleMouseEnterSales = () => {
    setIsHoveredSales(true);
  };

  const handleMouseLeaveSales = () => {
    setIsHoveredSales(false);
  };

  const handleMouseEnterFood = () => {
    setIsHoveredFood(true);
  };

  const handleMouseLeaveFood = () => {
    setIsHoveredFood(false);
  };

  const handleMouseEnterMonthlySales = () => {
    setIsHoveredMonthlySales(true);
  };

  const handleMouseLeaveMonthlySales = () => {
    setIsHoveredMonthlySales(false);
  };

  const handleMouseEnterAvgOrderValue = () => {
    setIsHoveredAvgOrderValue(true);
  };

  const handleMouseLeaveAvgOrderValue = () => {
    setIsHoveredAvgOrderValue(false);
  };

  const cardStyle = {
    paddingTop: "120px",
    width: "45%",
    marginLeft: "20px",
    marginBottom: "-60px",
    transition: "transform 0.1s ease-in-out",
  };

  const cardStyle2 = {
    paddingTop: "120px",
    width: "45%",
    marginLeft: "20px",
    marginBottom: "60px",
    transition: "transform 0.1s ease-in-out",
  };

  const cardStyleSales = {
    ...cardStyle,
    transform: isHoveredSales ? "scale(1.05)" : "scale(1)",
  };

  const cardStyleFood = {
    ...cardStyle,
    transform: isHoveredFood ? "scale(1.05)" : "scale(1)",
  };

  const cardStyleMonthlySales = {
    ...cardStyle2,
    transform: isHoveredMonthlySales ? "scale(1.05)" : "scale(1)",
  };

  const cardStyleAvgOrderValue = {
    ...cardStyle2,
    transform: isHoveredAvgOrderValue ? "scale(1.05)" : "scale(1)",
  };

  return (
    <div>
      <Navbar_Restaurant />
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Restaurant Sales Card */}
        <div style={cardStyleSales} onMouseEnter={handleMouseEnterSales} onMouseLeave={handleMouseLeaveSales}>
          <Card>
            <Card.Body>
              <Card.Title>Catagory-wise Sales</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={salesData}>
                    <Bar dataKey="Earned" fill="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Food Sold Card */}
        <div style={cardStyleFood} onMouseEnter={handleMouseEnterFood} onMouseLeave={handleMouseLeaveFood}>
          <Card>
            <Card.Body>
              <Card.Title>Food-wise Sales</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={foodSoldData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="food" type="category" />
                    <Bar dataKey="count" fill="#82ca9d" />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Monthly Sales Card */}
        <div style={cardStyleMonthlySales} onMouseEnter={handleMouseEnterMonthlySales} onMouseLeave={handleMouseLeaveMonthlySales}>
          <Card>
            <Card.Body>
              <Card.Title>Monthly Sales in BDT</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={monthlySalesData}>
                    <Bar dataKey="sales" fill="#ffbb28" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Average Order Value Card */}
        <div style={cardStyleAvgOrderValue} onMouseEnter={handleMouseEnterAvgOrderValue} onMouseLeave={handleMouseLeaveAvgOrderValue}>
          <Card>
            <Card.Body>
              <Card.Title>Average Order Per Month</Card.Title>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={averageOrderValueData}>
                    <Bar dataKey="averageOrder" fill="#82ca9d" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSalesPage;
