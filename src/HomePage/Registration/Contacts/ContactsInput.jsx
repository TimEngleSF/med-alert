import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../../Utilities/FormInput';
import UserContext from '../../../store/user-info-context';

const ContactsInput = () => {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [contactType, setContactType] = useState('');
  const inputRef = useRef(0);
  const userCtx = useContext(UserContext);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleRadioSelect = (e) => {
    setContactType(e.target.value);
  };

  const handleAdd = () => {
    if (!nameValue || !emailValue || !phoneValue || !contactType) {
      return;
    }
    const contactInfo = {
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
    };
    if (contactType === 'emergency') {
      userCtx.setEmergencyContacts((prevValue) => [...prevValue, contactInfo]);
    } else {
      userCtx.setPhysicianContacts((prevValue) => [...prevValue, contactInfo]);
    }
  };

  //TODO Add

  return (
    <li className="flex flex-col">
      <div className="mb-2">
        <FormInput
          text={'Name'}
          ref={inputRef}
          onChange={handleChange(setNameValue)}
        />
        <FormInput
          text={'Email'}
          onChange={handleChange(setEmailValue)}
          type="email"
        />
        <FormInput
          text={'Phone Number'}
          onChange={handleChange(setPhoneValue)}
        />
      </div>
      <div className="flex justify-between">
        <label className="flex items-center gap-2" htmlFor="emergency">
          Emergency:
          <input
            type="radio"
            name="contacts"
            id="emergency"
            value="emergency"
            onChange={handleRadioSelect}
          />
        </label>
        <label className="flex items-center gap-2" htmlFor="physician">
          Physician:
          <input
            type="radio"
            name="contacts"
            id="physician"
            value="physician"
            onChange={handleRadioSelect}
          />
        </label>
        <button
          type="button"
          className={`cursor-pointer h-8 w-16 rounded-md outline outline-[#b3a5af] outline-1 text-white bg-[#b3a5af] font-semibold tracking-wider`}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </li>
  );
};

ContactsInput.propTypes = {
  setEmergencyContacts: PropTypes.func,
  setPhysicianContacts: PropTypes.func,
};
export default ContactsInput;
