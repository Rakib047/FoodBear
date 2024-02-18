// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const ReviewModal = ({ show, handleClose, handleSubmit,restaurant_id }) => {
//   const [userRating, setUserRating] = useState(0);

//   const handleUserRating = async (rating) => {
//         setUserRating(rating);

//         //user will rate the restaurant
//         const userId = localStorage.getItem("user_id");
        
//         const response = await fetch(
//           `http://localhost:4010/api/restaurant/rating/${restaurant_id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ userId, rating: rating }),
//           }
//         );
    
//         const data = await response.json();
//         console.log("review er data")
//         console.log(data)
//   };

//   const renderClickableStars = () => {
//     if (userRating > 0) {
//       return <p>You rated {userRating} star{userRating > 1 ? 's' : ''}</p>;
//     }

//     let stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <i
//           key={i}
//           className={i <= userRating ? "bi bi-star-fill" : "bi bi-star"}
//           onClick={() => handleUserRating(i)}
//           style={{ cursor: "pointer", color: "#ff8a00" }}
//         ></i>
//       );
//     }
//     return stars;
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Give Review</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>
//               <strong>Your Rating</strong>
//             </Form.Label>
//             <div>{renderClickableStars()}</div>
//             <br />
//             <Form.Label>
//               <strong>Tell others more about this restaurant</strong>
//             </Form.Label>
//             <Form.Control
//               placeholder="Share your thoughts about the food quality, delivery experience, and overall satisfaction with our service!"
//               as="textarea"
//               rows={3}
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             type="submit"
//             style={{
//               backgroundColor: "#ff8a00",
//               borderColor: "#ff8a00",
//             }}
//           >
//             Submit
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ReviewModal;
