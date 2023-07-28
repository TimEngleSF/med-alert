import PropTypes from 'prop-types';
import {
  formatDistance,
  startOfDay,
  parse,
  differenceInMinutes,
} from 'date-fns';

const MedItem = ({ med }) => {
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

  function getTimePastMidnight() {
    const time = parse(med.time, 'HH:mm', new Date());

    const midnight = startOfDay(new Date());

    const diff = differenceInMinutes(time, midnight);

    return diff;
  }
  const medLate = () => {
    return getTimePastMidnight() >= 5;
  };
  console.log(getTimePastMidnight, medLate);
  // Eventually we need to set all items to false that were taken before today
  const isBeforeToday = () => {};

  const timeUntilMed = () => {
    const time = parse(med.time, 'HH:mm', new Date());
    const difference = differenceInMinutes(time, new Date());
    return difference;
  };

  const validToTakeMed = () => {
    return timeUntilMed() <= 30;
  };

  return (
    <li
      className={`flex flex-col mx-4 justify-center ${
        !med.taken && isFiveMinutesPast() ? 'bg-red-300' : 'bg-red-100'
      } ${
        med.taken ? 'bg-green-300' : 'bg-red-300'
      } h-32 py-2 rounded-lg shadow-lg ${
        validToTakeMed() ? ' opacity-100' : ' opacity-50'
      }`}
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
    time: PropTypes.string,
    _id: PropTypes.string,
    timeTaken: PropTypes.string,
  }),
  setMeds: PropTypes.func,
};

export default MedItem;
