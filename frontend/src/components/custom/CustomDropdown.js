import { useState, useRef, useEffect } from "react";

const CustomDropdown = ({ options, onSelect, dropdownText, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "10px", fontSize: "22px" }}>
          {dropdownText}
        </div>
        {required && (
          <div
            style={{ fontFamily: "inherit", fontSize: "22px", color: "red" }}
          >
            *
          </div>
        )}
      </div>
      <div style={{ width: "50vw", fontFamily: "inherit" }} ref={dropdownRef}>
        <div
          style={{
            padding: "10px",
            backgroundColor: "black",
            cursor: "pointer",
            borderRadius: "10px",
            height: "4rem",
            display: "flex",
            alignItems: "center",
            fontSize: "22px",
            justifyContent: "space-between",
          }}
          onClick={toggleDropdown}
        >
          {selectedOption ? selectedOption.name : "Select a room"}
          <span>{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <ul
            style={{
              position: "absolute",
              width: "inherit",
              zIndex: "100",
              backgroundColor: "black",
              borderRadius: "10px",
              overflow: "hidden",
              maxHeight: "30vh",
            }}
          >
            {options.map((option, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  fontSize: "22px",
                  height: "4rem",
                  cursor: "pointer",
                  backgroundColor:
                    selectedOption === option ? "orange" : "transparent",
                  borderBottom:
                    index === options.length - 1 ? "none" : "1px solid #ddd",
                }}
                onClick={() => handleSelectOption(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
