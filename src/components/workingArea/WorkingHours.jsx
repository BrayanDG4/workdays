import React, { useState, useEffect } from "react";

export const WorkingHours = () => {
  const initialUsers = [
    {
      name: "Usuario 1",
      schedule: {
        Monday: "6am - 3pm",
        Tuesday: "6am - 3pm",
        Wednesday: "6am - 3pm",
        Thursday: "6am - 3pm",
        Friday: "6am - 3pm",
        Saturday: "Off",
        Sunday: "Off",
      },
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [newUserName, setNewUserName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  useEffect(() => {
    // Almacenar en localStorage cuando cambia la lista de usuarios
    localStorage.setItem("userList", JSON.stringify(users));
  }, [users]);

  const handleScheduleChange = (userId, day, value) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.name === userId
          ? { ...user, schedule: { ...user.schedule, [day]: value } }
          : user
      );
      return updatedUsers;
    });
  };

  const handleNameChange = (userId, value) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.name === userId ? { ...user, name: value } : user
      );
      return updatedUsers;
    });
  };

  const handleAddUser = () => {
    const newUser = {
      name: newUserName.trim() || `Usuario ${users.length + 1}`,
      schedule: {
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Saturday: "",
        Sunday: "",
      },
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewUserName(""); // Clear the input field after adding a new user
  };

  const handleClearSchedule = () => {
    const updatedUsers = users.filter((user) => !selectedUsers.has(user.name));
    setUsers(updatedUsers);
    setSelectedUsers(new Set());
  };

  const handleSelectUser = (userName) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelection = new Set(prevSelectedUsers);
      if (newSelection.has(userName)) {
        newSelection.delete(userName);
      } else {
        newSelection.add(userName);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    setSelectedUsers((prevSelectedUsers) => {
      const allSelected = users.every((user) =>
        prevSelectedUsers.has(user.name)
      );
      const newSelection = new Set(prevSelectedUsers);

      for (const user of users) {
        if (allSelected) {
          newSelection.delete(user.name);
        } else {
          newSelection.add(user.name);
        }
      }

      return newSelection;
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="w-[20%]"></div>
        <div className="w-[80%]">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold gray-text mb-2">Semana 1</h3>
            <div className="flex gap-4">
              <a
                onClick={handleAddUser}
                className="text-xl gray-text-2 font-bold hover:gray-text transition-colors duration-150 cursor-pointer"
              >
                Agregar usuario
              </a>
              <a
                onClick={handleClearSchedule}
                className="text-xl gray-text-2 font-bold hover:gray-text transition-colors duration-150 cursor-pointer"
              >
                Limpiar horario
              </a>
            </div>
          </div>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-center text-xl gray-text bg-white">
            <th className="bg-[#EDF3EF] w-[17.5%]">
              <div className="flex items-center gap-3 m-2">
                <input
                  className="appearance-none h-6 w-6 bg-[#D9D9D9] rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                  type="checkbox"
                  checked={Object.values(selectedUsers).every(Boolean)}
                  onChange={handleSelectAll}
                />
                <p className="gray-text font-bold">Seleccionar todo</p>
              </div>
            </th>
            <th className="py-4 rounded-t-md bg-white w-[10%]">Lunes</th>
            <th className="w-[10%]">Martes</th>
            <th className="w-[10%]">Miércoles</th>
            <th className="w-[10%]">Jueves</th>
            <th className="w-[10%]">Viernes</th>
            <th className="w-[10%]">Sábado</th>
            <th className="w-[10%]">Domingo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.name}
              className="text-center gray-text font-semibold text-lg bg-white"
            >
              <td>
            <div className="flex items-center gap-3 m-2">
              <input
                className={`appearance-none h-6 w-10 rounded-md ${
                  selectedUsers.has(user.name) ? "bg-blue-500" : "bg-[#D9D9D9]"
                } checked:border-transparent focus:outline-none`}
                type="checkbox"
                checked={selectedUsers.has(user.name)}
                onChange={() => handleSelectUser(user.name)}
              />
              <div className="flex flex-col">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleNameChange(user.name, e.target.value)}
                  onBlur={() => localStorage.setItem("userList", JSON.stringify(users))}
                  className="gray-text font-bold w-full"
                />
                <p className="text-sm font-normal gray-text text-left">
                  Horas
                </p>
              </div>
            </div>
          </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Monday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Monday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Tuesday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Tuesday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Wednesday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Wednesday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Thursday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Thursday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Friday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Friday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Saturday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Saturday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
              <td className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8] w-[10%]">
                <input
                  type="text"
                  value={user.schedule.Sunday}
                  onChange={(e) =>
                    handleScheduleChange(user.name, "Sunday", e.target.value)
                  }
                  className="border-none bg-[#D2E3F0] text-center w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
