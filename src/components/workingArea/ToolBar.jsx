export const ToolBar = () => {
  return (
    <div className="py-4 px-4 flex justify-center items-center space-between bg-white">
      <div className="ml-2">
        <h1 className="text-3xl font-bold">
          <a href="">WorkDays</a>
        </h1>
      </div>

      <nav className="md:flex gap-4 md:items-center font-semibold gray-text text-xl">
        <a href="">Donaciones</a>
        <a href="">Exportar</a>
      </nav>
    </div>
  );
};
