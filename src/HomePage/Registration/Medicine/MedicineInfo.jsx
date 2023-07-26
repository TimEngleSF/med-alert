import MedicineInput from './MedicineInput';
import PropTypes from 'prop-types';
import MedicineItem from './MedicineItem';

import Button from '../../Utilities/Button';
const MedicinceInfo = ({ setRegistrationPage, medicines, setMedicines }) => {
  const handleNextClick = (e) => {
    if (medicines.length === 0) {
      return;
    }
    setRegistrationPage('contacts');
  };

  const handleBackClick = () => {
    setRegistrationPage('user');
  };
  const medItemEls = medicines.map((med) => (
    <MedicineItem key={name} name={med.name} time={med.time} />
  ));
  //////Need to reach out to DB and check if username or email already exist

  return (
    <>
      <h2>Add Medications</h2>
      <ul className="text-sm mb-8">
        <MedicineInput medicines={medicines} setMedicines={setMedicines} />
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
  medicines: PropTypes.array,
  setMedicines: PropTypes.func,
  setRegistrationPage: PropTypes.func,
  setUsernameValue: PropTypes.func,
  setEmailValue: PropTypes.func,
  setPasswordValue: PropTypes.func,
  setShowRegister: PropTypes.func,
};
export default MedicinceInfo;
