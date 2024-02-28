import { useNavigate } from "react-router-dom";
import "./Button.scss";

const ButtonBack = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="secondary-btn-icon-only" onClick={goBack}>
      <img src={props.icon} alt="" />
    </button>
  );
};

export default ButtonBack;
