import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ContactsInput from './ContactsInput';
import ContactItems from './ContactItem';
import UserContext from '../../../store/user-info-context';

import Button from '../../Utilities/Button';
const ContactsInfo = ({ setRegistrationPage }) => {
  const [showNext, setShowNext] = useState(true);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    if (
      userCtx.physicianContacts.length === 0 &&
      userCtx.emergencyContacts.length === 0
    ) {
      setShowNext(true);
      return;
    }
    setShowNext(false);
  }, [userCtx.physicianContacts, userCtx.emergencyContacts]);
  const handleBackClick = () => {
    setRegistrationPage('medicine');
  };
  const emergencyEls = userCtx.emergencyContacts.map((contact) => (
    <ContactItems
      key={contact.name}
      name={contact.name}
      email={contact.email}
    />
  ));

  return (
    <>
      <h2>Add Concacts</h2>
      <ul className="text-sm mb-8">
        <ContactsInput
          setEmergencyContacts={userCtx.setEmergencyContacts}
          setPhysicianContacts={userCtx.setPhysicianContacts}
        />
      </ul>
      <ul
        className={`py-4 px-2 ${
          userCtx.emergencyContacts.length > 0 ? 'opacity-1' : 'opacity-0'
        } duration-300`}
      >
        <span className="font-semibold tracking-wide">EMERGENCY:</span>
        {emergencyEls.length > 0 && emergencyEls}
      </ul>
      <div className="flex flex-col gap-4">
        <Button
          text="Next"
          type="button"
          bgColor="bg-red-500"
          textColor="text-white"
          disabled={showNext}
          opacity={showNext ? 'opacity-0' : 'opacity-1'}
          // onClick={handleNextClick}
        />
        <Button text="Back" onClick={handleBackClick} />
      </div>
    </>
  );
};

ContactsInfo.propTypes = {
  setRegistrationPage: PropTypes.func,
};
export default ContactsInfo;
