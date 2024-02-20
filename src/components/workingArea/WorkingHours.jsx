import React, { useState, useEffect, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContextMenu } from "./contextMenu/ContextMenu";

export const WorkingHours = ({ week }) => {
  const { number, users: initialUsers } = week;
  const [users, setUsers] = useState(initialUsers || []);
  const [newUserName, setNewUserName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const pastelColors = useMemo(
    () => ["#FFD8BE", "#D2E3F0", "#FFD3F2", "#E4FFC1", "#FFECB3"],
    []
  );
  const [rowColors, setRowColors] = useState({});
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedUserForContextMenu, setSelectedUserForContextMenu] =
    useState(null);

  const fullUserList = useMemo(() => {
    const storedData = JSON.parse(localStorage.getItem("userList")) || {};
    storedData[number] = users;
    return storedData;
  }, [users, number]);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(fullUserList));
  }, [fullUserList]);

  const handleScheduleChange = useCallback(
    (userId, day, startTime, endTime) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                schedule: {
                  ...user.schedule,
                  [day]: { start: startTime, end: endTime },
                },
              }
            : user
        )
      );
    },
    []
  );

  const calculateTotalHours = useCallback((userSchedule) => {
    let totalHours = 0;
    Object.values(userSchedule).forEach((daySchedule) => {
      if (daySchedule.start && daySchedule.end) {
        const startTime = parseInt(daySchedule.start.split(":")[0]);
        const endTime = parseInt(daySchedule.end.split(":")[0]);
        totalHours += endTime - startTime;
      }
    });
    return totalHours;
  }, []);

  const handleNameChange = useCallback((userId, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, name: value } : user
      )
    );
  }, []);

  const handleSaveToLocal = useCallback(() => {
    localStorage.setItem("userList", JSON.stringify(fullUserList));
  }, [fullUserList]);

  const handleAddUser = useCallback(() => {
    const newUser = {
      id: uuidv4(),
      name: newUserName.trim() || `Usuario ${users.length + 1}`,
      schedule: {
        Monday: { start: "", end: "" },
        Tuesday: { start: "", end: "" },
        Wednesday: { start: "", end: "" },
        Thursday: { start: "", end: "" },
        Friday: { start: "", end: "" },
        Saturday: { start: "", end: "" },
        Sunday: { start: "", end: "" },
      },
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewUserName("");
    handleSaveToLocal();
  }, [newUserName, users, handleSaveToLocal]);

  const handleClearSchedule = useCallback(() => {
    const updatedUsers = users.filter((user) => !selectedUsers.has(user.id));
    setUsers(updatedUsers);
    setSelectedUsers(new Set());
    handleSaveToLocal();
  }, [users, selectedUsers, handleSaveToLocal]);

  const handleSelectUser = useCallback((userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelection = new Set(prevSelectedUsers);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      return newSelection;
    });
  }, []);

  const handleContextMenu = useCallback((event, userId, day) => {
    event.preventDefault();
    if (
      event.target.tagName.toLowerCase() === "input" &&
      event.target.type === "time"
    ) {
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
      setContextMenuVisible(true);
      setSelectedUserForContextMenu(userId);
    }
  }, []);

  const handleColorSelect = useCallback(
    (color) => {
      setRowColors((prevRowColors) => ({
        ...prevRowColors,
        [selectedUserForContextMenu]: color,
      }));
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserForContextMenu
            ? {
                ...user,
                schedule: Object.fromEntries(
                  Object.entries(user.schedule).map(([day, value]) => [
                    day,
                    { ...value, color: color },
                  ])
                ),
              }
            : user
        )
      );
      setContextMenuVisible(false);
    },
    [selectedUserForContextMenu]
  );

  const handleSelectAll = useCallback(() => {
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
  }, [users]);

  return (
    <>
      <div className="">
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-1/5"></div>
          <div className="w-full md:w-4/5">
            <div className="flex justify-between items-center mb-1">
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
                  Remover usuario
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-center text-xl gray-text bg-white">
                <th className="bg-[#EDF3EF] w-[15%] md:w-[16%] lg:w-[15%]">
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
                <th className="py-4 rounded-t-md bg-white w-1/10 md:w-1/12">
                  Lunes
                </th>
                <th className="w-1/10 md:w-1/12">Martes</th>
                <th className="w-1/10 md:w-1/12">Miércoles</th>
                <th className="w-1/10 md:w-1/12">Jueves</th>
                <th className="w-1/10 md:w-1/12">Viernes</th>
                <th className="w-1/10 md:w-1/12">Sábado</th>
                <th className="w-1/10 md:w-1/12">Domingo</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) &&
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="text-center gray-text font-semibold text-lg bg-white"
                  >
                    <td className="flex items-center gap-3 m-2 h-full">
                      <input
                        className={`appearance-none h-6 w-[34px] rounded-md ${
                          selectedUsers.has(user.id)
                            ? "bg-blue-500"
                            : "bg-[#D9D9D9]"
                        } checked:border-transparent focus:outline-none`}
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                      <div className="flex flex-col flex-grow">
                        <input
                          type="text"
                          value={user.name}
                          onChange={(e) =>
                            handleNameChange(user.id, e.target.value)
                          }
                          onBlur={handleSaveToLocal}
                          className="gray-text font-bold w-full h-[46px] mb-1 border-none"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        />
                        <p className="text-sm font-normal gray-text text-left">
                          Horas semanales: {calculateTotalHours(user.schedule)}
                        </p>
                      </div>
                    </td>

                    {Object.keys(user.schedule).map((day) => (
                      <td
                        key={day}
                        className={`border-t-8`}
                        style={{
                          backgroundColor: rowColors[user.id] || "#D2E3F0",
                          borderTop: rowColors[user.id] || "#D2E3F0",
                        }}
                        onContextMenu={(event) =>
                          handleContextMenu(event, user.id, day)
                        }
                      >
                        <div className="flex flex-col pb-2">
                          <input
                            type="time"
                            value={user.schedule[day].start}
                            onChange={(e) =>
                              handleScheduleChange(
                                user.id,
                                day,
                                e.target.value,
                                user.schedule[day].end
                              )
                            }
                            className="border-none text-center w-full h-[46px] resize-none text-[16px] md:text-[16px]"
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: rowColors[user.id] || "#D2E3F0",
                            }}
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={user.schedule[day].end}
                            onChange={(e) =>
                              handleScheduleChange(
                                user.id,
                                day,
                                user.schedule[day].start,
                                e.target.value
                              )
                            }
                            className="border-none text-center w-full h-[46px] resize-none text-[16px] md:text-[16px]"
                            style={{
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: rowColors[user.id] || "#D2E3F0",
                            }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Menú contextual */}
      <ContextMenu
        visible={contextMenuVisible}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
        onClose={() => setContextMenuVisible(false)}
        onSelectColor={handleColorSelect}
        userId={selectedUserForContextMenu}
        colors={pastelColors}
      />
    </>
  );
};
