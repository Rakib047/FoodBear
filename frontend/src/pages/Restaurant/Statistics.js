import React, { useState , useEffect} from "react";
import { Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import { Footer } from "../../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";

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
  const [totalOrder,setTotalOrder] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0);
  const [restaurants, setRestaurant] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/restaurant/dashboard"
      );

      setRestaurant(response.data);

      response.data.map((item, index) => {
        if (item._id === localStorage.getItem("restaurant_id")) {
          
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchOrders = async () => {
    let response = await fetch(
      `http://localhost:4010/api/order/restaurant/orders/${localStorage.getItem(
        "restaurant_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    console.log("response", response);
    // const complete = response.filter((order) => order.status === "delivered");
    // setCompletedOrders(complete);

    // const active = response.filter((order) => order.status !== "delivered");
    // setActiveOrders(active);

    setTotalOrder(response.length);

    const totalPrice = response.reduce((acc, order) => acc + order.total_price, 0);
    console.log(totalIncome);
    setTotalIncome(totalPrice);


  };

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  

  const mycardStyle = {
    paddingTop: "120px",
    width: "45%",
    marginLeft: "20px",
    marginBottom: "-60px",
    transition: "transform 0.1s ease-in-out",
  };
  
  return (
    <div align="center">
      {restaurants.map((item , index) =>{
        if(item._id === localStorage.getItem("restaurant_id")){
          const restaurant = item;

          return (
            <div>
      <Navbar_Restaurant />
      <div className="container" align="center" style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Restaurant Sales Card */}
        

        <div style={mycardStyle}>
          <Card>
            <Card.Body>
              <Card.Title>Showing Total Order</Card.Title>
              <div>
              <p>{totalOrder}</p>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div style={mycardStyle}>
          <Card>
            <Card.Body>
              <Card.Title>Showing Total Income</Card.Title>
              <div>
              <p>{totalIncome}</p>
              </div>
            </Card.Body>
          </Card>
        </div>

      </div>
    </div>
          );
        }
      })}
    </div>
  );

 
};

export default RestaurantSalesPage;
