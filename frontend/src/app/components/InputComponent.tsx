import React, { useState } from "react";

export default function InputComponent(props) {
  const { onAdd } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(inputValue);
      setInputValue("");
    }
  };
  return (
    <div>
      <input
        className="appearance-none  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        placeholder="What needs to be done?"
      />
    </div>
  );
}
