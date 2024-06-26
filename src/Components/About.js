import Hero from "./Hero";
const About = ({ loginStatus }) => {
  return (
    <>
      <Hero
        text="About Us"
        loginStatus={loginStatus}
      />
      <div style={{padding:"60px"}}/>
    </>
  );
};
export default About;
