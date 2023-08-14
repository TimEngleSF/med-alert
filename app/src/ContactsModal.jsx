import { useContext } from 'react';
import UserContext from './store/user-info-context';

const ContactsModal = () => {
  const userCtx = useContext(UserContext);
  const physicians = userCtx.physicianContacts;
  const emergency = userCtx.emergencyContacts;
  const handleClick = () => {
    userCtx.setShowContacts(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
          {emergency.map((contact, index) => (
            <div key={index} className="mb-4 bg-red-100 p-4 rounded">
              <h3 className="font-bold">{contact.name}</h3>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Physicians</h2>
          {physicians.map((contact, index) => (
            <div key={index} className="mb-4 bg-blue-100 p-4 rounded">
              <h3 className="font-bold">{contact.name}</h3>
              <p>Phone: {contact.phone}</p>
              <p>Email: {contact.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsModal;
