import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContextMenu } from "./contextMenu/ContextMenu";

export const WorkingHours = ({ week }) => {
  const { number, users: initialUsers } = week;
  const [users, setUsers] = useState(initialUsers);
  const [newUserName, setNewUserName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const pastelColors = ["#FFD8BE", "#C1E3FF", "#FFD3F2", "#E4FFC1", "#FFECB3"];
  const [cellColors, setCellColors] = useState({});
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(getFullUserList()));
  }, [users]);

  const getFullUserList = () => {
    const storedData = JSON.parse(localStorage.getItem("userList")) || {};
    storedData[number] = users;
    return storedData;
  };

  const handleScheduleChange = (userId, day, value) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId
          ? { ...user, schedule: { ...user.schedule, [day]: value } }
          : user
      );
      return updatedUsers;
    });
  };

  const handleNameChange = (userId, value) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) =>
        user.id === userId ? { ...user, name: value } : user
      );
      return updatedUsers;
    });
  };

  const handleSaveToLocal = () => {
    localStorage.setItem("userList", JSON.stringify(getFullUserList()));
  };

  const handleAddUser = () => {
    const newUser = {
      id: uuidv4(),
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
    setNewUserName("");
    handleSaveToLocal();
  };

  const handleClearSchedule = () => {
    const updatedUsers = users.filter((user) => !selectedUsers.has(user.id));
    setUsers(updatedUsers);
    setSelectedUsers(new Set());
    handleSaveToLocal();
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelection = new Set(prevSelectedUsers);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      return newSelection;
    });
  };

  const handleContextMenu = (event, userId, day) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const handleColorSelect = (color) => {
    // Aquí puedes implementar la lógica para asignar el color a la celda seleccionada
    console.log("Color seleccionado:", color);
  };

  const handleSelectAll = () => {
    setSelectedUsers((prevSelectedUsers) => {
      const allSelected = users.every((user) => prevSelectedUsers.has(user.id));
      const newSelection = new Set(prevSelectedUsers);

      for (const user of users) {
        if (allSelected) {
          newSelection.delete(user.id);
        } else {
          newSelection.add(user.id);
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
            <h3 className="text-3xl font-bold gray-text mb-2">
              Semana {number}
            </h3>
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
                Limpiar usuario
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
                  className={`appearance-none h-6 w-6 bg-[#D9D9D9] rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none`}
                  type="checkbox"
                  checked={
                    users.length > 0 && selectedUsers.size === users.length
                  }
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
              key={user.id}
              className="text-center gray-text font-semibold text-lg bg-white"
            >
              <td className="flex items-center gap-3 m-2">
                <input
                  className={`appearance-none h-6 w-10 rounded-md ${
                    selectedUsers.has(user.id) ? "bg-blue-500" : "bg-[#D9D9D9]"
                  } checked:border-transparent focus:outline-none`}
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
                <div className="flex flex-col flex-grow">
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleNameChange(user.id, e.target.value)}
                    onBlur={handleSaveToLocal}
                    className="gray-text font-bold w-full truncate"
                    style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  />
                  <p className="text-sm font-normal gray-text text-left">
                    Horas
                  </p>
                </div>
              </td>
              {Object.keys(user.schedule).map((day) => {
                const cellKey = `${user.id}_${day}`;
                const backgroundColor = cellColors[cellKey] || "#D2E3F0";

                return (
                  <td
                    key={day}
                    className="bg-[#D2E3F0] border-t-8 border-[#9AC5E8]"
                    style={{ backgroundColor }}
                    onContextMenu={(event) =>
                      handleContextMenu(event, user.id, day)
                    }
                  >
                    <textarea
                      value={user.schedule[day]}
                      onChange={(e) =>
                        handleScheduleChange(user.id, day, e.target.value)
                      }
                      className="mx-1 border-none bg-[#D2E3F0] text-center w-full resize-none"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.5",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Menú contextual */}
      <ContextMenu
        visible={contextMenuVisible}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        onClose={() => setContextMenuVisible(false)}
        onSelectColor={handleColorSelect}
        colors={pastelColors}
      />
    </>
  );
};
