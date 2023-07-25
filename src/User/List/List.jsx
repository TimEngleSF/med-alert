import PropTypes from 'prop-types';
import Times from './Times';

const List = ({ meds, setMeds }) => {
  let grouped = meds.reduce((acc, obj) => {
    let key = obj['time'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  const timeGroups = Object.values(grouped).sort(
    (a, b) => a[0].time < b[0].time
  );

  const timeGroupsEl = timeGroups.map((group) => (
    <Times key={group.time} meds={group} setMeds={setMeds} />
  ));

  //TImed groups is an array of arrays of objects with identical time

  // console.log(medicationTimes);
  return (
    <section className="bg-slate-600 w-[90%] mx-auto">
      <ul>{timeGroupsEl}</ul>
    </section>
  );
};

List.propTypes = {
  meds: PropTypes.array,
  setMeds: PropTypes.func,
};
export default List;
