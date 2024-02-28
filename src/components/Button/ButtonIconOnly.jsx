import "./Button.scss";

const ButtonIconOnly = (props) => {
  return (
    <button className="secondary-btn-icon-only">
      <img src={props.icon} alt="" />
    </button>
  );
};

export default ButtonIconOnly;
