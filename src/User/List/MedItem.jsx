// import { FaCheck } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  formatDistance,
  startOfDay,
  parse,
  differenceInMinutes,
  getMinutes,
} from 'date-fns';

import UserContext from '../../store/user-info-context';
import { useContext } from 'react';

const IP = import.meta.env.VITE_APP_SIP;
const PORT = import.meta.env.VITE_APP_SPORT;

const MedItem = ({ med, setMeds }) => {
  const userCtx = useContext(UserContext);
  const checkmark = (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={5}
        stroke="green"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    </i>
  );

  const cross = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={5}
      stroke="red"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const timeDifference = () =>
    formatDistance(new Date(), new Date(med.timeTaken));

  function isFiveMinutesPast() {
    const givenTime = parse(med.time, 'HH:mm', new Date());

    const now = new Date();

    const diff = differenceInMinutes(now, givenTime);

    return diff > 5;
  }

  const isBeforeToday = () => {};

  const timeUntilMed = () => {
    const time = parse(med.time, 'HH:mm', new Date());
    const difference = differenceInMinutes(time, new Date());
    return difference;
  };

  const validToTakeMed = () => {
    return timeUntilMed() <= 30;
  };

  const handleUpdate = () => {
    if (!validToTakeMed()) {
      return;
    }
    const updatedBoolean = !med.taken;

    axios({
      method: 'PUT',
      url: `http://${IP}:${PORT}/api/medicines`,
      data: { id: med._id, boolean: updatedBoolean },
    }).then((response) => {
      let updatedMed = response.data.value;
      if (!updatedBoolean) {
        updatedMed = { ...response.data.value, timeTaken: null };
      }

      userCtx.setMedicines((prevState) =>
        prevState.map((medicine) =>
          medicine._id === updatedMed._id ? updatedMed : medicine
        )
      );
    });

    // set up checkmark to change
    // set up time from timeTaken property using date-fns,
  };
  return (
    <li
      className={`flex flex-col mx-4 justify-center ${
        !med.taken && isFiveMinutesPast() ? 'bg-red-300' : 'bg-red-100'
      } ${med.taken ? 'bg-green-300' : ''} h-32 py-2 rounded-lg shadow-lg ${
        validToTakeMed()
          ? 'cursor-pointer opacity-100'
          : 'cursor-not-allowed opacity-50'
      }`}
      onClick={handleUpdate}
    >
      <div className="flex items-center justify-between h-3/4 px-4 mb-2">
        <span className="uppercase font-semibold tracking-widest text-xl">
          {med.name}
        </span>
        <div className="flex">
          <div
            className={`${
              med.taken ? 'opacity-100' : 'opacity-0'
            } duration-300`}
          >
            {checkmark}
          </div>
          <div
            className={`${
              !med.taken && isFiveMinutesPast() ? 'opacity-100' : 'opacity-0'
            } duration-300`}
          >
            {cross}
          </div>
        </div>
      </div>
      <div
        className={`h-1/4 px-4 ${
          med.taken ? 'opacity-100' : 'opacity-0'
        } duration-300`}
      >
        {med.taken && (
          <span className="w-full text-end inline-block italic">
            Taken {timeDifference()} ago
          </span>
        )}
      </div>
    </li>
  );
};

MedItem.propTypes = {
  med: PropTypes.shape({
    name: PropTypes.string,
    taken: PropTypes.bool,
    _id: PropTypes.string,
    timeTaken: PropTypes.string,
  }),
  setMeds: PropTypes.func,
};

export default MedItem;
