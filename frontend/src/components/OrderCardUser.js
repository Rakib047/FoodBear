import React, { useState, useEffect } from "react";
import MapModal from "./DpToUserMap";
import ReviewModal from "./ReviewModal";

export default function FoodCard_Restaurant(props) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //fetching all foods
  const [foods, setFoods] = useState([]);
  const fetchFoods = async () => {
    let response = await fetch("http://localhost:4010/api/order/user/foods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoods(response);
    console.log(foods);
  };

  //fetching all restaurants
  const [restaurants, setRestaurants] = useState([]);
  const fetchRestaurants = async () => {
    let response = await fetch("http://localhost:4010/api/user/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log("in restu");
    setRestaurants(response);
  };

  useEffect(() => {
    fetchFoods();
    fetchRestaurants();
  }, []);

  const cardStyle = {
    width: "100%",
    height: "100%",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    transition: "transform 0.1s ease-in-out",
  };

  const [showMapModal, setShowMapModal] = useState(false);

  const handleShowMapModal = () => setShowMapModal(true);
  const handleCloseMapModal = () => setShowMapModal(false);

  //review modal part
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleShowReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // handle review submission here
  };

  return (
    <div
      className="card mt-3"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-body"
        style={{
          boxShadow: "0px 4px 8px rgba(1, 1, 1, 0.2)",
          marginBottom: "0px",
        }}
      >
        <div className="row">
          <div className="col-8">
            <h5>
              <u>Ordered Foods</u>
            </h5>
            {foods.map((food) => {
              const orderedFood = props.food_items.find(
                (food_item) => food_item.food_id === food._id
              );

              if (orderedFood) {
                const subtotal = orderedFood.quantity * food.price;

                return (
                  <div className="row">
                    <div className="col-6">&bull; {food.name}</div>
                    <div className="col-2">X{orderedFood.quantity}</div>
                    <div className="col-4">Tk {subtotal}</div>
                  </div>
                );
              }
              return null;
            })}
            <h6 className="mt-4">Total: Tk {props.total_price}</h6>
            <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
              {new Date(props.date).toLocaleString()}
            </p>
          </div>

          <div className="col-4">
            {restaurants.map((restaurant) => {
              if (restaurant._id === props.restaurant_id) {
                return (
                  <div>
                    <h5 className="mb-1">
                      <u>Restaurant</u>
                    </h5>
                    <p style={{ fontSize: "1.3rem" }}>{restaurant.name}</p>
                    <p style={{ fontSize: "0.8rem", marginBottom: "0px" }}>
                      Address: {restaurant.location}
                      <br />
                      Contact: {restaurant.contact}
                    </p>
                    <div
                      className="d-flex flex-row justify-content-left mt-4"
                      style={{ alignItems: "center", marginBottom: "0px" }}
                    >
                      {props.status === "pending" && (
                        <h5>
                          <span
                            className="badge bg-danger text-white badge-lg"
                            style={{ alignSelf: "flex-start" }}
                          >
                            Pending
                          </span>
                        </h5>
                      )}
                      {props.status === "confirmed" && (
                        <h5>
                          <span
                            className="badge bg-warning text-white badge-lg"
                            style={{ alignSelf: "flex-start" }}
                          >
                            Cooking
                          </span>
                        </h5>
                      )}
                      <>
                        {props.status === "picked_up" && (
                          <h5>
                            <span
                              className="badge bg-warning text-white badge-lg"
                              style={{ alignSelf: "flex-start" }}
                            >
                              On The Way
                            </span>
                            <button
                              onClick={handleShowMapModal}
                              className="badge text-white badge-lg"
                              style={{
                                backgroundColor: "#ff8a00",
                                color: "white",
                                border: "none",
                                margin: "10px",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "1px",
                              }}
                            >
                              Check <i class="fa-solid fa-location-dot"></i>
                            </button>
                          </h5>
                        )}

                        {showMapModal && (
                          <MapModal
                            show={showMapModal} // Pass show prop
                            user={props.user} // Pass user prop
                            onClose={handleCloseMapModal} // Pass onClose prop
                          />
                        )}
                      </>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <button
          className="btn btn-primary"
          style={{
            position: "absolute",
            bottom: "15px",
            right: "81px",
            backgroundColor: "#ff8a00",
            borderColor: "#ff8a00",
          }}
          onClick={handleShowReviewModal}
        >
          Give Review
        </button>

        {showReviewModal && (
          <ReviewModal
            show={showReviewModal}
            handleClose={handleCloseReviewModal}
            handleSubmit={handleReviewSubmit}
          />
        )}
        
      </div>
    </div>
  );
}
