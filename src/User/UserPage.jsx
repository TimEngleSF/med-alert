import { useContext, useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../store/user-info-context';
import MedicineList from './List/MedicineList';
import getUserInfo from '../API/getUserInfo';

const UserPage = () => {
  const [requestData, setRequestData] = useState(null);
  const userCtx = useContext(UserContext);
  const { username } = useParams();
  console.log(username);
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/userInfo/${username}`,
    }).then((response) => {
      const { user, medicines, contacts } = response.data;
      console.log(user, medicines, contacts);
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

  // useEffect(() => {
  //   getUserInfo(username).then((response) => {
  //     const { user, medicines, contacts } = response.data;
  //     console.log(user, medicines, contacts);
  //     userCtx.setUsernameValue(user.username);
  //     userCtx.setFullNameValue(user.fullNameValue);
  //     userCtx.setEmailValue(user.email);
  //     userCtx.setQrCode(user.qrCode);
  //     userCtx.setAllergies(user.allergies);

  //     userCtx.setMedicines(medicines);

  //     userCtx.setEmergencyContacts(contacts.emergency);
  //     userCtx.setPhysicianContacts(contacts.physicians);
  //   });
  // }, []);
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

  return (
    <main>
      <MedicineList />
      <img src={userCtx.qrCode}></img>
    </main>
  );
};
export default UserPage;
