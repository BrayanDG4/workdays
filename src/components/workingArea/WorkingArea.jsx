import React, { useState } from "react";
import { ToolBar } from "./ToolBar";
import { WorkingHours } from "./WorkingHours";

export const WorkingArea = () => {
  const [weeks, setWeeks] = useState([]);

  const handleAddWeek = () => {
    // Calcula el número de la nueva semana
    const newWeekNumber =
      weeks.length > 0 ? weeks[weeks.length - 1].number + 1 : 1;

    // Crea la nueva semana con un array vacío de usuarios
    const newWeek = {
      number: newWeekNumber,
      users: [],
    };

    // Actualiza el estado añadiendo la nueva semana al array de semanas
    setWeeks((prevWeeks) => [...prevWeeks, newWeek]);
  };

  const handleDeleteWeek = (weekNumberToDelete) => {
    // Elimina la semana del estado
    setWeeks((prevWeeks) =>
      prevWeeks.filter((week) => week.number !== weekNumberToDelete)
    );

    // Elimina la semana del localStorage
    const storedData = JSON.parse(localStorage.getItem("userList")) || {};
    delete storedData[weekNumberToDelete];
    localStorage.setItem("userList", JSON.stringify(storedData));
  };

  return (
    <>
      <ToolBar />
      <section className="h-full w-full">
        <div className="h-screen">
          <div className="container mx-auto px-2 pt-8">
            <div className="mb-1">
              <h2 className="text-4xl font-bold gray-text mb-2">Actividades</h2>
              <div className="text-2xl gray-text-2 font-bold">
                <p>0 seleccionados</p>
              </div>
            </div>

            {weeks.map((week) => (
              <div className="mb-4" key={week.number}>
                <WorkingHours week={week} />
              </div>
            ))}

            <div className="flex justify-center items-center gap-4 mb-2">
              <button
                className="text-xl gray-text-2 font-bold hover:gray-text transition-colors duration-150 cursor-pointer"
                onClick={handleAddWeek}
              >
                Agregar semana
              </button>
              {weeks.length > 1 && (
                <button
                  onClick={() =>
                    handleDeleteWeek(weeks[weeks.length - 1].number)
                  }
                  className="text-xl gray-text-2 font-bold hover:gray-text transition-colors duration-150 cursor-pointer"
                >
                  Eliminar semana
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
