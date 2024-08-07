import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import PlanCard from "./PlanCard";
import { CircularProgress, Snackbar, Alert, Grid, Typography, Container, Box} from "@mui/material";
import Testimonial from "../utils/Testimonials";
import FAQ from "../utils/FAQ";
import Footer from "../utils/Footer";
import FeatureCard from "../utils/FeatureCards";

const Home = () => {
  const [loginStatus, setLoginStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState();
  const [open, setOpen] = useState(false);
  const plansRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const showSnackbar = sessionStorage.getItem("showSnackbar");
    if (showSnackbar) {
      setOpen(true);
      sessionStorage.removeItem("showSnackbar");
    }
    const loginStatus = sessionStorage.getItem("loginStatus");
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
    setLoginStatus(loginStatus);
    // sessionStorage.removeItem("loginStatus");
    // sessionStorage.removeItem("user");
   
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await axios.get("https://nh-project.onrender.com/api/plans");
      setPlans(response.data.data.plans);
    };
    fetchPlans();
  }, []);

  let plansHtml = null;
  if (plans) {
    plansHtml = plans.map((plan, i) => {
      return <PlanCard plan={plan} user={user} key={i} />;
    });
  } else {
    plansHtml = <CircularProgress />;
  }
  const planClick = () => {
      setTimeout(() => {
        const element = document.getElementById("plans");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Timeout to allow the page to load first
  };

  return (
    <>
      <Hero loginStatus={loginStatus} plansRef={plansRef} reviewsRef={reviewsRef} faqsRef={faqsRef} contactRef={contactRef} user={user}/>
      <div style={{padding:"42px"}} id="top" />
      <div className="hero-section">
        <div className="lkjh">
      <div className="h-title">Get the Best Health Insurance Plans</div>
        <div className="h-info">Get 100% hospital bill payment & tax deductions up to ₹75,000.</div>
        <div style={{padding:"20px"}} />
        <div className="plan-button" onClick={planClick}>Check Plans</div>
        </div>
      </div>
      <Container>
        <Box py={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="Extensive Coverage"
                description="Our plans cover a wide range of medical services, ensuring you get the care you need."
                image="coverage.png"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="Affordable Plans"
                description="We offer competitive pricing without compromising on the quality of coverage."
                image="affordable.webp"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard
                title="24/7 Support"
                description="Our customer service team is available around the clock to assist you with any queries."
                image="support.png"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <div style={{padding:"20px"}} id="plans" ref={plansRef} />
      <Container>
        <Box py={5}>
          <div className="htyu">
            <div className="ytry">Choose the perfect plan for you</div>
            <div className="hgtr">Our Plans</div>
            <div className="ytry">Explore the Best  Health Insurance Options</div>
            </div>
          <div className="plan-container">{plansHtml}</div>
        </Box>
      </Container>
      <div style={{padding:"20px"}} id="reviews" ref={reviewsRef} />
      <div className="testimonials-section">
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Testimonial
                name="Adam Hansen"
                review="Great insurance plans and amazing customer service. Highly recommend!"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Testimonial
                name="Dianna Garrison"
                review="Affordable plans with extensive coverage. Very satisfied with my choice."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Testimonial
                name="Kerry McCullough"
                review="Easy to navigate and the support team is very helpful."
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={{padding:"20px"}} id="faq" ref={faqsRef} />
      <div className="faq-section">
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <FAQ />
        </Container>
      </div>
      <div style={{padding:"20px"}} id="contact" ref={contactRef} />
      <Footer />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          You are Logged In Successfully!!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;

