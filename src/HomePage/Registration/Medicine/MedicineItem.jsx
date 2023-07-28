import PropTypes from 'prop-types';

const MedicineItem = ({ name, time }) => {
  function convertToAmPm(time24hr) {
    const [hour, minute] = time24hr.split(':');
    let amPm = 'AM';
    let hour12hr = parseInt(hour);

    if (hour12hr >= 12) {
      amPm = 'PM';
      hour12hr = hour12hr === 12 ? 12 : hour12hr - 12;
    }

    if (hour12hr === 0) {
      hour12hr = 12;
    }

    return `${hour12hr}:${minute} ${amPm}`;
  }
  return (
    <li className="flex justify-between px-2">
      <span className="uppercase">{name}</span>
      <span>{convertToAmPm(time)}</span>
    </li>
  );
};

MedicineItem.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
};

export default MedicineItem;
