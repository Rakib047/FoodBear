import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddFoodModal = ({ show, onHide, onSubmit }) => {
  const [food, setFood] = useState({
    name: "",
    CategoryName: "",
    price: "",
    img: "",
  });

  const onChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await fetch(
      "http://localhost:4010/api/restaurant/addfood",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: food.name,
          CategoryName: food.CategoryName,
          price: food.price,
          img: food.img,
          restaurant_id: localStorage.getItem("restaurant_id"),
        }),
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
        <Form onSubmit={handleSubmit}>
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
            <Form.Control
              type="text"
              placeholder="Enter food category"
              name="CategoryName"
              value={food.CategoryName}
              onChange={onChange}
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFoodModal;