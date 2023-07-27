// import { FaCheck } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import axios from 'axios';
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
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // const = handleUpdate

  const handleUpdate = () => {
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
          medicine._id === updatedMed._id ? updatedMed : med
        )
      );
    });
    // then update medicines array with the returned updated object
    // set up checkmark to change
    // set up time from timeTaken property using date-fns,
  };
  return (
    <li className="bg-blue-100 py-2 rounded-lg" onClick={handleUpdate}>
      <div className="flex items-center justify-between px-4 mb-2">
        <span className="uppercase">{med.name}</span>
        {checkmark}
      </div>
      <span className="w-full text-end inline-block">3min ago</span>
    </li>
  );
};

MedItem.propTypes = {
  med: PropTypes.shape({
    name: PropTypes.string,
    taken: PropTypes.bool,
    _id: PropTypes.string,
  }),
  setMeds: PropTypes.func,
};

export default MedItem;
