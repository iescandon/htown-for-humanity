import MultiToggle from "react-multi-toggle";
import { useEffect } from "react";

const groupOptions = [
  {
    displayName: "🇺🇦",
    value: "ukrainian",
    // optionClass: 'ukranian',
  },
  {
    displayName: "🇺🇸",
    value: "english",
    // optionClass: 'english',
  },
];

function Toggle({ language, setLanguage }) {

  useEffect(()=>{
    const btns = document.querySelectorAll('.toggleOption')
    var btnsArr = Array.prototype.slice.call(btns);
    console.log(btnsArr)
    if (btnsArr) {
      btnsArr.map((btn) => {
        btn.tabIndex = 0;
        btn.addEventListener('keydown', keyboardToggle);
        btn.dataset.language = btn.innerText;
      });
    }
  },[])

  const keyboardToggle = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      let option = e.target.dataset.language;
      if (option === "🇺🇦") {
        option = 'ukrainian'
      } else {
        option = 'english'
      }
      onToggle(option);
    }
  }

  const onToggle = (value) => {
    setLanguage(value);
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
