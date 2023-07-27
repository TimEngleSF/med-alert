const UserPage = () => {
  return (
    <div className="container bg-blue-50 h-full py-6">
      <header>
        <h1 className="text-3xl mb-4 ">MediAlert*</h1>
      </header>
      <main>
        <List meds={meds} setMeds={setMeds} />
      </main>
    </div>
  );
};
export default UserPage;
