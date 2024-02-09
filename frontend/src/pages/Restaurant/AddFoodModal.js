import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

const AddFoodModal = ({ show, onHide, onSubmit }) => {
  const [food, setFood] = useState({
    name: "",
    CategoryName: "", // Changed to CategoryName
    price: "",
    img: "",
  });

  const onChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];

    if (food.name.trim() === "") {
      errors.push("Name must not be empty");
    }

    if (food.CategoryName.length === 0) {
      errors.push("Category must not be empty");
    }

    if (food.price <= 0) {
      errors.push("Price must be greater than 0");
    }

    if (food.img.trim() === "") {
      errors.push("Image must not be empty");
    }

    return errors;
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const response = await axios.post(
      "http://localhost:4010/api/restaurant/addfood",
      {
        name: food.name,
        CategoryName: food.CategoryName, // Pass CategoryName
        price: food.price,
        img: food.img,
        restaurant_id: localStorage.getItem("restaurant_id"),
      }
    );

    window.location.href = "/restaurant/foods";
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Food</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter food name"
              name="name"
              value={food.name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="CategoryName">
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={onChange}
              name="CategoryName"
              value={food.CategoryName}
            >
              <option value="">Select Category</option>
              <option value="Burgers">Burgers</option>
              <option value="Pizza">Pizza</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Soups">Soups</option>
              <option value="Tacos">Tacos</option>
              <option value="Sushi">Sushi</option>
              <option value="Seafood">Seafood</option>
              <option value="Steaks">Steaks</option>
              <option value="BBQ">BBQ</option>
              <option value="Vegetarian/Vegan">Vegetarian/Vegan</option>
              <option value="Asian Cuisine">Asian Cuisine</option>
              <option value="Indian Cuisine">Indian Cuisine</option>
              <option value="Mexican Cuisine">Mexican Cuisine</option>
              <option value="Italian Cuisine">Italian Cuisine</option>
              <option value="Middle Eastern Cuisine">
                Middle Eastern Cuisine
              </option>
              <option value="Breakfast/Brunch">Breakfast/Brunch</option>
              <option value="Desserts">Desserts</option>
              <option value="Pastries">Pastries</option>
              <option value="Bakery Items">Bakery Items</option>
              <option value="Ice Cream/Gelato">Ice Cream/Gelato</option>
              <option value="Smoothies/Juices">Smoothies/Juices</option>
              <option value="Coffee/Tea">Coffee/Tea</option>
              <option value="Street Food">Street Food</option>
              <option value="Comfort Food">Comfort Food</option>
              <option value="Gluten-Free Options">Gluten-Free Options</option>
              <option value="Health/Superfoods">Health/Superfoods</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Fried Chicken">Fried Chicken</option>
              <option value="Hot Dogs">Hot Dogs</option>
              <option value="Barbecue">Barbecue</option>
              <option value="Korean Cuisine">Korean Cuisine</option>
              <option value="Thai Cuisine">Thai Cuisine</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Curries">Curries</option>
              <option value="Biryani">Biryani</option>
              <option value="Kebabs">Kebabs</option>
              <option value="Tandoori">Tandoori</option>
              <option value="Paratha">Paratha</option>
              <option value="Naan">Naan</option>
              <option value="Puri">Puri</option>
              <option value="Dal">Dal</option>
              <option value="Paneer Dishes">Paneer Dishes</option>
              <option value="Fish Dishes">Fish Dishes</option>
              <option value="Prawn Dishes">Prawn Dishes</option>
              <option value="Chicken Dishes">Chicken Dishes</option>
              <option value="Beef Dishes">Beef Dishes</option>
              <option value="Mutton Dishes">Mutton Dishes</option>
              <option value="Vegetable Dishes">Vegetable Dishes</option>
              <option value="Mixed Vegetables">Mixed Vegetables</option>
              <option value="Chutneys">Chutneys</option>
              <option value="Pickles">Pickles</option>
              <option value="Salads">Salads</option>
              <option value="Desserts">Desserts</option>
              <option value="Sweets">Sweets</option>
              <option value="Juices">Juices</option>
              <option value="Lassis">Lassis</option>
              <option value="Tea">Tea</option>
              <option value="Coffee">Coffee</option>
              <option value="Soft Drinks">Soft Drinks</option>
              <option value="Lemonade">Lemonade</option>
              <option value="Samosas">Samosas</option>
              <option value="Korma">Korma</option>
              <option value="Dopiaza">Dopiaza</option>
              <option value="Saag">Saag</option>
              <option value="Kofta">Kofta</option>
              <option value="Bhuna">Bhuna</option>
              <option value="Rogan Josh">Rogan Josh</option>
              <option value="Aloo Gobi">Aloo Gobi</option>
              <option value="Bhaji">Bhaji</option>
              <option value="Pakora">Pakora</option>
              <option value="Raita">Raita</option>
              <option value="Khichuri">Khichuri</option>
              <option value="Halwa">Halwa</option>
              <option value="Jalebi">Jalebi</option>
              <option value="Pitha">Pitha</option>
              <option value="Chingri">Chingri</option>
              <option value="Korai">Korai</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Or type your category"
              name="CategoryName"
              value={food.CategoryName}
              onChange={onChange}
              style={{ marginTop: "5px" }}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter food price"
              name="price"
              value={food.price}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="img">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="img"
              value={food.img}
              onChange={onChange}
            />
          </Form.Group>
          <div className="modal-footer">
            <Button variant="success" size="sm" onClick={handleAddSubmit}>
              Add food
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFoodModal;
