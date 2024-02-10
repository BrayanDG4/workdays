import React from "react";

export const ContextMenu = ({
  visible,
  x,
  y,
  onClose,
  onSelectColor,
  colors,
}) => {
  const handleColorSelect = (color) => {
    onSelectColor(color);
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      className="absolute z-10 bg-white border border-gray-200 shadow-lg"
      style={{ top: y, left: x }}
    >
      <div className="p-2">
        <p className="text-sm font-medium text-gray-700">
          Seleccione un color:
        </p>
        <div className="flex justify-center mt-2 space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
