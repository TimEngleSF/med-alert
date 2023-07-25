import { FaCheck } from 'react-icons/fa6';
import PropTypes from 'prop-types';

const MedItem = ({ med, setMeds }) => {
  return (
    <li className="bg-blue-100 py-2 rounded-lg">
      <div className="flex items-center justify-between px-4 mb-2">
        <span className="uppercase">{med.name}</span>
        <i>
          <FaCheck />
        </i>
      </div>
      <span className="w-full text-end inline-block">3min ago</span>
    </li>
  );
};

MedItem.propTypes = {
  med: PropTypes.shape({
    name: PropTypes.string,
  }),
  setMeds: PropTypes.func,
};

export default MedItem;
