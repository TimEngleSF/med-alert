import PropTypes from 'prop-types';

const Button = ({
  text,
  type = 'button',
  bgColor,
  textColor,
  onClick,
  disabled = false,
  opacity,
}) => {
  return (
    <button
      type={type}
      className={`cursor-pointer h-8 ${bgColor} ${textColor} ${opacity} rounded-md outline outline-2 duration-300`}
      onClick={onClick}
      disabled={disabled}
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
  disabled: PropTypes.bool,
  opacity: PropTypes.string,
};
export default Button;
