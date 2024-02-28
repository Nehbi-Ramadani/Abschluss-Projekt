import "./Button.scss";

const Button = (props) => {
  return (
    <>
      <button className="primary-btn-icon ">
        <img src={props.icon} alt="" />
        {props.content}
      </button>
    </>
  );
};

export default Button;
