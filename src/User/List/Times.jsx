import { useContext } from 'react';
import UserContext from '../../store/user-info-context';
import MedItem from './MedItem';

import PropTypes from 'prop-types';

const Times = ({ meds, setMeds }) => {
  const userCtx = useContext(UserContext);
  const medItemsEl = meds.map((med) => (
    <MedItem key={med.name} med={med} setMeds={userCtx.setMedicines} />
  ));

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
    <li className="timeContainer">
      <span>{convertToAmPm(meds[0].time)}</span>
      <ul
        className={`timesContainer ${meds[0].time} bg-white flex flex-col gap-5 py-5 `}
      >
        {medItemsEl}
      </ul>
    </li>
  );
};

Times.propTypes = {
  meds: PropTypes.array,
  setMeds: PropTypes.func,
};
export default Times;
