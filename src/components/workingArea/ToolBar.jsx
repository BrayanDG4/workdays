export const ToolBar = ({ downloadPDF }) => {
  const handleExportClick = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    downloadPDF(); // Llama a la función downloadPDF pasada como prop
  };
  return (
    <div className="py-4 px-4 flex justify-center items-center space-between bg-white">
      <div className="ml-2">
        <h1 className="text-3xl font-bold">
          <a href="">WorkDays</a>
        </h1>
      </div>

      <nav className="md:flex gap-4 md:items-center font-semibold gray-text text-xl">
        <a
          className="text-xl gray-text font-bold hover:gray-text-2 transition-colors duration-150 cursor-pointer"
          href="/"
          onClick={handleExportClick} // Llama a la función manejadora de clics
        >
          Exportar
        </a>
      </nav>
    </div>
  );
};
