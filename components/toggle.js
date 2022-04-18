import MultiToggle from "react-multi-toggle";

import { useState, useEffect } from "react";

const groupOptions = [
  {
    displayName: "🇺🇦",
    value: "ukrainian",
    // optionClass: 'checkmark',
  },
  {
    displayName: "🇺🇸",
    value: "english",
    // optionClass: 'xmark',
  },
];

function Toggle({ language, setLanguage }) {

  const onToggle = (value) => {
    setLanguage(value);
    console.log(value)
  };

  return (
    <>
      <MultiToggle
        options={groupOptions}
        selectedOption={language}
        onSelectOption={onToggle}
        className="togglesize"
      />
    </>
  );
}

export default Toggle;
