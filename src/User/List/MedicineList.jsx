import PropTypes from 'prop-types';
import { parse } from 'date-fns';
import Times from './Times';
import UserContext from '../../store/user-info-context';
import { useContext } from 'react';

const MedicineList = () => {
  const userCtx = useContext(UserContext);
  let grouped = userCtx.medicines.reduce((acc, obj) => {
    let key = obj['time'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  // const timeGroups = Object.values(grouped).sort(
  //   (a, b) => a[0].time > b[0].time
  // );
  const timeGroups = Object.values(grouped).sort((a, b) => {
    const timeA = parse(a[0].time, 'HH:mm', new Date());
    const timeB = parse(b[0].time, 'HH:mm', new Date());

    return timeA - timeB;
  });

  console.log('Grouped', timeGroups);
  const timeGroupsEl = timeGroups.map((group) => (
    <Times key={group.time} meds={group} setMeds={userCtx.setMedicines} />
  ));
  console.log(timeGroups);
  //TImed groups is an array of arrays of objects with identical time

  // console.log(medicationTimes);
  return (
    <section className=" w-[90%] mx-auto">
      <ul>{timeGroupsEl}</ul>
    </section>
  );
};

MedicineList.propTypes = {
  meds: PropTypes.array,
  setMeds: PropTypes.func,
};

export default MedicineList;
