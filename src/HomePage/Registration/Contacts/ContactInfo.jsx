import PropTypes from 'prop-types';

import Button from '../../Utilities/Button';
const ContactsInfo = ({
  emergencyContacts,
  physicianContacts,
  setEmergencyContacts,
  setPhysicianContacts,
  setRegistrationPage,
}) => {
  //   const handleNextClick = (e) => {
  //     if (medicines.length === 0) {
  //       return;
  //     }
  //     setRegistrationPage('contacts');
  //   };
  //   const handleBackClick = () => {
  //     setRegistrationPage('medicine');
  //   };
  //   const medItemEls = medicines.map((med) => (
  //     <MedicineItem key={name} name={med.name} time={med.time} />
  //   ));
  //   //////Need to reach out to DB and check if username or email already exist
  //   return (
  //     <>
  //       <h2>Add Medications</h2>
  //       <ul className="text-sm mb-8">
  //         <MedicineInput medicines={medicines} setMedicines={setMedicines} />
  //       </ul>
  //       <ul>{medItemEls.length > 0 && medItemEls}</ul>
  //       <div className="flex flex-col gap-4">
  //         <Button
  //           text="Next"
  //           type="button"
  //           bgColor="bg-red-500"
  //           textColor="text-white"
  //           onClick={handleNextClick}
  //         />
  //         <Button text="Back" onClick={handleBackClick} />
  //       </div>
  //     </>
  //   );
};

ContactsInfo.propTypes = {
  emergencyContacts: PropTypes.string,
  physicianContactsContacts: PropTypes.string,
  setEmergencyContacts: PropTypes.func,
  setPhysicianContacts: PropTypes.func,
  setRegistrationPage: PropTypes.func,
};
export default ContactsInfo;
