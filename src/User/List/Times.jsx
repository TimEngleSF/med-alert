import MedItem from './MedItem';
import PropTypes from 'prop-types';

const Times = ({ meds, setMeds }) => {
  console.log(meds);
  const medItemsEl = meds.map((med) => (
    <MedItem key={med.name} med={med} setMeds={setMeds} />
  ));

  return (
    <li className="timeContainer">
      <span>{meds[0].time}</span>
      <ul
        className={`timesContainer ${meds[0].time} bg-slate-300 flex flex-col gap-5 py-5 `}
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
