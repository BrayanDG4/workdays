export const UserCards = (props) => {
  return (
    <div className="bg-yellow-400 grid grid-cols-1 mt-2">
      <div className="flex items-center gap-3 m-2">
        <div className="">
          <input className="w-5 h-5" type="checkbox" name="" id="" />
        </div>
        <div className="overflow-hidden">
          <p className="font-bold gray-text">EncoDev</p>
          <span>Guerrero educado</span>
        </div>
      </div>
    </div>
  );
};
