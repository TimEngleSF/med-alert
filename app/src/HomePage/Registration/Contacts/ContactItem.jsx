import PropTypes from 'prop-types';

const ContactItems = ({ name, email }) => {
  return (
    <li className="flex justify-between">
      <span className="">{name}</span>
      <span>{email}</span>
    </li>
  );
};

ContactItems.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};

export default ContactItems;
