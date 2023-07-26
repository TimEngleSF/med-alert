import PropTypes from 'prop-types';

const Button = ({ text, type = 'button', bgColor, textColor, onClick }) => {
  return (
    <button
      type={type}
      className={`cursor-pointer h-8 ${bgColor} ${textColor} rounded-md outline outline-2`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
