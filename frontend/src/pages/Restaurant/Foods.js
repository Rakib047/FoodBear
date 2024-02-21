import React, { useState, useEffect } from "react";
import Card from "./FoodCard_Restaurant";
import Navbar_Restaurant from "../../components/Navbar_Restaurant";
import axios from "axios";

export default function ShowFoods_Restaurant() {
  const [foods, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [offeredFoods, setOfferedFoods] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/restaurant/foods"
      );
      const response2 = await axios.get(
        `http://localhost:4010/api/restaurant/offer/${localStorage.getItem(
          "restaurant_id"
        )}`
      );

      const responseData = response.data;
      setFoodItems(responseData[0]);
      setFoodCategory(responseData[1]);

      setOfferedFoods(response2.data);
      console.log(offeredFoods);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  return (
    <div>
      <Navbar_Restaurant />

      <div className="container" style={{ position: "relative", top: "100px" }}>
        {offeredFoods && offeredFoods.length > 0
          ? offeredFoods.map((foodItem, index) => (
              <div key={index} className="row mb-3">
                <h3>{foodItem.offeredCatagoryName}</h3>
                <hr />

                <div className="col-12 col-md-6 col-lg-3">
                  <Card
                    _id={foodItem.foodId}
                    restaurant_id={foodItem.restaurant_id}
                    name={foodItem.foodItemName}
                    img={foodItem.img}
                    CategoryName={foodItem.offeredCatagoryName}
                    price={foodItem.mainPrice}
                    offeredPrice={foodItem.offeredPrice}
                    isDiscounted={true}
                    is_instock={foodItem.is_instock}
                  ></Card>
                </div>
              </div>
            ))
          : null}

        {foodCategory ? (
          foodCategory.map((item, index) => {
            const foodsInCategory = foods.filter(
              (foodItem) =>
                foodItem.CategoryName === item.CategoryName &&
                foodItem.restaurant_id === localStorage.getItem("restaurant_id")
            );

            if (foodsInCategory.length > 0) {
              return (
                <div key={index} className="row mb-3">
                  <h3>{item.CategoryName}</h3>
                  <hr />

                  {foodsInCategory.map((foodItem) => (
                    <div
                      key={foodItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        _id={foodItem._id}
                        restaurant_id={foodItem.restaurant_id}
                        name={foodItem.name}
                        img={foodItem.img}
                        CategoryName={foodItem.CategoryName}
                        price={foodItem.price}
                        is_instock={foodItem.is_instock}
                        isDiscounted={false}
                        isAddedToOffer={offeredFoods.some(offeredFood => offeredFood.foodId === foodItem._id)}
                      ></Card>
                    </div>
                  ))}
                </div>
              );
            }
            return null; // Don't render anything if there are no foods in this category
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}
