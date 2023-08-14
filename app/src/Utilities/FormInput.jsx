import PropTypes from 'prop-types';

const FormInput = ({ text, type = 'text', onChange }) => {
  return (
    <label className="flex flex-col mb-4">
      <span className="font-thin  mb-1">{text}</span>
      <input
        type={type}
        className="h-8 outline outline-1 indent-1 rounded-md"
        onChange={onChange}
      />
    </label>
  );
};
FormInput.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};
export default FormInput;
