import { useEffect, useState } from "react";
import Hero from "./Hero";
import { Container, Typography, Grid, Box } from "@mui/material";
import TeamMemberCard from "../utils/TeamMemberCard";
import Footer from "../utils/Footer";

const About = () => {
  const [loginStatus, setLoginStatus] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    setLoginStatus(loginStatus);
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  const teamMembers = [
    { name: "John Doe", position: "CEO", image: "john_doe.jpg", bio: "John has over 20 years of experience in the health insurance industry." },
    { name: "Jane Smith", position: "CTO", image: "jane_smith.jpg", bio: "Jane is a tech visionary with a passion for improving healthcare through technology." },
    { name: "Samuel Green", position: "COO", image: "samuel_green.jpg", bio: "Samuel oversees operations ensuring efficiency and customer satisfaction." },
  ];

  return (
    <>
      <Hero
        text="About Us"
        loginStatus={loginStatus}
        user={user}
      />
      <div style={{padding:"40px"}} id="top"/>
      <Container>
        <Box py={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            Who We Are
          </Typography>
          <Typography paragraph>
            Welcome to MyInsurance, your trusted partner in health insurance. We are dedicated to providing you with the best health insurance plans to protect you and your loved ones. Our team of experts works tirelessly to ensure you have access to the best medical care when you need it most.
          </Typography>
      <div style={{padding:"10px"}} />
          <Typography variant="h4" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography paragraph>
            Our mission is to make high-quality healthcare accessible and affordable for everyone. We strive to offer comprehensive health insurance plans that cater to the diverse needs of our clients.
          </Typography>
      <div style={{padding:"10px"}} />
          <Typography variant="h4" component="h2" gutterBottom>
            Our Vision
          </Typography>
          <Typography paragraph>
            Our vision is to be the leading provider of health insurance, known for our commitment to customer satisfaction and innovation in healthcare solutions.
          </Typography>
      <div style={{padding:"10px"}} />
          <Typography variant="h4" component="h2" gutterBottom>
            Our Core Values
          </Typography>
          <Typography paragraph>
            <ul>
              <li><strong>Integrity:</strong> We conduct our business with the highest standards of ethics and honesty.</li>
              <li><strong>Customer Focus:</strong> Our customers are at the heart of everything we do.</li>
              <li><strong>Innovation:</strong> We continuously seek new and better ways to serve our customers.</li>
              <li><strong>Excellence:</strong> We strive for excellence in every aspect of our business.</li>
              <li><strong>Teamwork:</strong> We believe in the power of working together to achieve our goals.</li>
            </ul>
          </Typography>
      <div style={{padding:"10px"}} />
          <Typography variant="h4" component="h2" gutterBottom>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <TeamMemberCard
                  name={member.name}
                  position={member.position}
                  image={member.image}
                  bio={member.bio}
                />
              </Grid>
            ))}
          </Grid>
            <div style={{padding:"10px"}} />
          <Typography variant="h4" component="h2" gutterBottom>
            Our History
          </Typography>
          <Typography paragraph>
            Founded in 2015, MyInsurance has grown to become a trusted name in the health insurance industry. Our journey began with a simple goal: to provide reliable and affordable health insurance to everyone. Over the years, we have expanded our services and continually improved our offerings to better serve our customers.
          </Typography>
            <div style={{padding:"10px"}} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default About;
