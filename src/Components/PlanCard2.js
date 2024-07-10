import poster from "./Images/download2.png";
const formatIndianCurrency = (amount) => {
  const x = amount.toString().split('.');
  let lastThree = x[0].substring(x[0].length - 3);
  const otherNumbers = x[0].substring(0, x[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return x.length > 1 ? result + '.' + x[1] : result;
};


const PlanCard = ({ plan }) => {


  let featuresHTML = null;
  if(plan.features){
    featuresHTML=plan.features.map((feature,i)=>{
      return <li className="check" key={i}>{feature}</li>
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
          <ul style={{"list-style":"none"}}>
            {featuresHTML}
          </ul>
        </div>
        <div className="plan-description">
          <b>Coverage: Rs. </b>
          {formatIndianCurrency(plan.coverage)} /-
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
