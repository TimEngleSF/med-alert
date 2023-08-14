import { useContext } from 'react';
import { parse, format } from 'date-fns';
import UserContext from '../../store/user-info-context';
import MedItem from './MedItem';

import PropTypes from 'prop-types';

const Times = ({ meds, setMeds }) => {
  const userCtx = useContext(UserContext);
  const medItemsEl = meds.map((med) => (
    <MedItem key={med.name} med={med} setMeds={userCtx.setMedicines} />
  ));

  const medsTaken = meds.every((med) => med.taken);

  function convertToAmPm(time24hr) {
    const date = parse(time24hr, 'HH:mm', new Date());
    const timeInAMPM = format(date, 'hh:mm a');

    return timeInAMPM;
  }

  return (
    <li
      className={`timeContainer bg-white py-5 mb-6 shadow-md rounded-lg ${
        medsTaken ? 'opacity-60' : 'opacity-100'
      } duration-300`}
    >
      <span className="text-xl px-3">{convertToAmPm(meds[0].time)}</span>
      <ul
        className={`timesContainer ${meds[0].time} flex flex-col gap-5 py-5 `}
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
