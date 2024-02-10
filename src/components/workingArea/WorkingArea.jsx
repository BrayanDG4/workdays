import React, { useState, useEffect } from "react";
import { ToolBar } from "./ToolBar";
import { WorkingHours } from "./WorkingHours";

export const WorkingArea = () => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    // Al cargar el componente, verifica si hay datos en el localStorage
    const storedData = JSON.parse(localStorage.getItem("userList")) || {};
    if (Object.keys(storedData).length > 0) {
      // Si hay datos, establece las semanas del estado con los datos del localStorage
      const savedWeeks = Object.entries(storedData).map(([number, users]) => ({
        number: parseInt(number),
        users,
      }));
      setWeeks(savedWeeks);
    } else {
      // Si no hay datos en el localStorage, crea una semana por defecto
      const defaultWeek = {
        number: 1,
        users: [
          {
            id: "1",
            name: "Usuario 1",
            schedule: {
              Monday: "8:00 AM - 5:00 PM",
              Tuesday: "8:00 AM - 5:00 PM",
              Wednesday: "8:00 AM - 5:00 PM",
              Thursday: "8:00 AM - 5:00 PM",
              Friday: "8:00 AM - 5:00 PM",
              Saturday: "Off",
              Sunday: "Off",
            },
          },
          // Agrega más usuarios o datos según sea necesario
        ],
      };
      setWeeks([defaultWeek]);
      // Guarda la semana por defecto en el localStorage
      localStorage.setItem(
        "userList",
        JSON.stringify({ 1: defaultWeek.users })
      );
    }
  }, []);

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
