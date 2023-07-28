import { useContext, useEffect } from 'react';
import { Dna } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../store/user-info-context';
import MedicineList from './List/MedicineList';

const GuestPage = () => {
  const userCtx = useContext(UserContext);
  const { username } = useParams();
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/userInfo/${username}`,
    }).then((response) => {
      const { user, medicines, contacts } = response.data;
      userCtx.setUsernameValue(user.username);
      userCtx.setFullNameValue(user.fullNameValue);
      userCtx.setEmailValue(user.email);
      userCtx.setQrCode(user.qrCode);
      userCtx.setAllergies(user.allergies);

      userCtx.setMedicines(medicines);

      userCtx.setEmergencyContacts(contacts.emergency);
      userCtx.setPhysicianContacts(contacts.physicians);
    });
  }, []);

  useContext(() => {
    if (!userCtx.username) {
      return (
        <div className="h-[90%] flex items-center justify-center">
          <Dna
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      );
    }
  }, []);
  const handleQRClick = () => {
    userCtx.setShowQR(true);
  };
  const handleContactsClick = () => {
    userCtx.setShowContacts(true);
  };
  return (
    <>
      <header className="flex justify-between mb-10 px-3">
        <h1 className="text-xl tracking-[0.225em] font-bold">MediAlert*</h1>
        <ul className=" flex gap-10">
          <li>
            <a
              className=" text-lg text-red-500 cursor-pointer hover:text-red-600 hover:border-b-2 border-b-red-600 hover:py-0.5 duration-300"
              onClick={handleQRClick}
            >
              QR
            </a>
          </li>
          <li>
            <a
              className=" text-lg text-red-500 cursor-pointer hover:text-red-600 hover:border-b-2 border-b-red-600 hover:py-0.5 duration-300"
              onClick={handleContactsClick}
            >
              CONTACTS
            </a>
          </li>
        </ul>
      </header>
      <main>
        <MedicineList />
      </main>
    </>
  );
};
export default GuestPage;
