import React from 'react'
import { Footer } from '../components/Footer'
import {Navbar} from "../components/Navbar"
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Carousal} from "../components/Carousal"

export const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-2" style={{ position: "relative", top: "75px" }}>
        <Carousal />

        <Container>
          <Row
            className="mx-auto"
            data-aos="fade-up"
            data-aos-easing="ease-out"
            data-aos-duration="700"
          >
            <Col xs={12} className="text-center mt-3 mb-3">
              <div>
                <h2>
                  <span style={{ color: "orange" }}>Join</span>
                  <span style={{ color: "black" }}> With Us</span>
                </h2>
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              lg={6}
              data-aos="fade-up"
              data-aos-easing="ease-out"
              data-aos-duration="700"
              data-aos-delay="150"
            >
              <div className="px-2">
                <img
                  src="https://media.istockphoto.com/id/1369920192/photo/chef-presenting-a-plate-of-food.webp?b=1&s=170667a&w=0&k=20&c=5Pg68hwW09ke2lQAVCd5VyZCARI6NGKT4vWoV01CW04="
                  alt=""
                  height="100%"
                  width="100%"
                />
              </div>
            </Col>

            <Col
              lg={6}
              data-aos="fade-up"
              data-aos-easing="ease-out"
              data-aos-duration="700"
              data-aos-delay="300"
            >
              <div className="px-2">
                <h4>List your restaurant or home-made foods on FoodBear</h4>
                <p>
                  {" "}
                  Would you like millions of new customers to enjoy your amazing
                  foods? So would we! It's simple: we list your menu online,
                  help you process orders, pick them up, and deliver them to
                  foodies, within some minutes!{" "}
                </p>
                <p> Interested? Let's start our partnership today! </p>
                <button
                  className="btn"
                  style={{ backgroundColor: "#ff8a00", color: "black" }}
                  onClick={() => {
                    window.location.href = "/restaurant/signup";
                  }}
                >
                  Create Bussiness Account
                </button>
                <p style={{ fontSize: "16px", marginTop: "20px" }}>
                  Already have a business account?{" "}
                  <Link to="/restaurant/login" style={{ color: "#ff8a00" }}>
                    Log in
                  </Link>
                </p>
              </div>
            </Col>
          </Row>

          <hr className="my-4" />

          <Row>
            <Col
              lg={6}
              data-aos="fade-up"
              data-aos-easing="ease-out"
              data-aos-duration="700"
              data-aos-delay="300"
            >
              <div className="px-2">
                <h4>List yourself as a delivery person on FoodBear</h4>
                <p>
                  {" "}
                  Would you like to earn money by delivering food? It's simple:
                  we list your profile online, help you get orders, pick them
                  up, and deliver them to foodies, within some minutes!{" "}
                </p>
                <p> Interested? Let's start a new journey! </p>
                <button
                  className="btn"
                  style={{ backgroundColor: "#ff8a00", color: "black" }}
                  onClick={() => {
                    window.location.href = "/deliveryperson/signup";
                  }}
                >
                  Join As Delivery Person
                </button>

                {/* New Link for delivery person login */}
                <p style={{ fontSize: "16px", marginTop: "20px" }}>
                  Already registered?{" "}
                  <Link to="/deliveryperson/login" style={{ color: "#ff8a00" }}>
                    Log in
                  </Link>
                </p>
              </div>
            </Col>
            <Col
              lg={6}
              data-aos="fade-up"
              data-aos-easing="ease-out"
              data-aos-duration="700"
              data-aos-delay="150"
            >
              <div className="px-2">
                <img
                  src="https://pandariders.foodpanda.com.bd/wp-content/uploads/sites/14/2022/12/DSC3262.jpg"
                  alt=""
                  height="100%"
                  width="100%"
                />
              </div>
            </Col>
          </Row>

          <div className="my-4" />
        </Container>
        <Footer />
      </div>
    </div>
  )
}

