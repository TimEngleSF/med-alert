import { useContext } from 'react';
import UserContext from './store/user-info-context';

const QRModal = () => {
  const userCtx = useContext(UserContext);
  const handleClick = () => {
    userCtx.setShowQR(false);
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <img src={userCtx.qrCode} alt="qrCode" className="mx-auto" />
      </div>
    </div>
  );
};

export default QRModal;
