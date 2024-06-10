import poster from "./Images/download2.png";
const PlanCard = ({ plan }) => {
  return (
    <>
      <div className="plan-card">
        <div>
          <img className="plan-poster" src={poster} alt="plan poster" />
          <div className="plan-title">{plan.plan_name}</div>
        </div>
        <div className="line"></div>
        <div className="plan-description">
          <b>Description: </b>
          {plan.description}
        </div>
        <div className="plan-description">
          <b>Created On: </b>
          {plan.created_on}
        </div>
        <div className="price">Rs. {plan.price}/- </div>
        <div className="price-second">*tax excluded</div>
      </div>
    </>
  );
};
export default PlanCard;
