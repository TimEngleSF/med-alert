import MedicineInput from './MedicineInput';
import PropTypes from 'prop-types';
import MedicineItem from './MedicineItem';
import UserContext from '../../../store/user-info-context';

import Button from '../../Utilities/Button';
import { useContext } from 'react';
const MedicinceInfo = ({ setRegistrationPage }) => {
  const userCtx = useContext(UserContext);
  const handleNextClick = (e) => {
    if (userCtx.medicines.length === 0) {
      return;
    }
    setRegistrationPage('contacts');
  };

  const handleBackClick = () => {
    setRegistrationPage('user');
  };
  const medItemEls = userCtx.medicines.map((med) => (
    <MedicineItem key={name} name={med.name} time={med.time} />
  ));
  //////Need to reach out to DB and check if username or email already exist

  return (
    <>
      <h2>Add Medications</h2>
      <ul className="text-sm mb-8">
        <MedicineInput
          medicines={userCtx.medicines}
          setMedicines={userCtx.setMedicines}
        />
      </ul>
      <ul>{medItemEls.length > 0 && medItemEls}</ul>
      <div className="flex flex-col gap-4">
        <Button
          text="Next"
          type="button"
          bgColor="bg-red-500"
          textColor="text-white"
          onClick={handleNextClick}
        />
        <Button text="Back" onClick={handleBackClick} />
      </div>
    </>
  );
};

MedicinceInfo.propTypes = {
  setRegistrationPage: PropTypes.func,
};
export default MedicinceInfo;
