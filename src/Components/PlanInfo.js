import Hero from "./Hero";
import { useLocation} from "react-router-dom";
import PlanCard2 from "./PlanCard2";
const PlanInfo = ({ loginStatus, setLoginStatus, showLogout, setShowLogout })=>{

    const location = useLocation();
    const { plan, user } = location.state || {};
    // console.log(plan);

    return(
        <>
        <Hero text ={"Plan Information"} loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
        showLogout={showLogout}
        setShowLogout={setShowLogout}
        user={user} />
        <PlanCard2 plan={plan}/>
        <div className="info-sec"></div>
        </>
    )
}
export default PlanInfo;