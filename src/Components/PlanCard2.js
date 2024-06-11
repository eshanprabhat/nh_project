import poster from "./Images/download2.png";

const PlanCard = ({ plan }) => {


  let featuresHTML = null;
  if(plan.features){
    featuresHTML=plan.features.map((feature,i)=>{
      return <li key={i}>{feature}</li>
    })
  }else{
    featuresHTML="No Features found!!"
  }
  return (
    <>
      <div className="plan-card2">
        <div>
          <img className="plan-poster" src={poster} alt="plan poster" />
          <div className="plan-title">{plan.plan_name}</div>
        </div>
        <div className="line"></div>
        <div className="plan-tagline">"{plan.tagline}"</div>
        <div className="plan-description plan-features">
          <ul>
            {featuresHTML}
          </ul>
        </div>
        <div className="plan-description">
          <b>Created On: </b>
          {plan.created_on}
        </div>
        <div className="plan-description">
          <b>Duration: </b>
          1 Year
        </div>
        <div className="price">Rs. {plan.price}/- </div>
        <div className="price-second">*tax excluded</div>
      </div>
    </>
  );
};
export default PlanCard;
