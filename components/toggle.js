import MultiToggle from "react-multi-toggle";
import { useEffect } from "react";

const groupOptions = [
  {
    displayName: "πΊπ¦",
    value: "ukrainian",
    // optionClass: 'ukranian',
  },
  {
    displayName: "πΊπΈ",
    value: "english",
    // optionClass: 'english',
  },
];

function Toggle({ language, setLanguage }) {

  useEffect(()=>{
    const btns = document.querySelectorAll('.toggleOption')
    var btnsArr = Array.prototype.slice.call(btns);
    // console.log(btnsArr)
    if (btnsArr) {
      btnsArr.map((btn) => {
        btn.tabIndex = 0;
        btn.addEventListener('keydown', keyboardToggle);
        btn.dataset.language = btn.innerText;
        if (btn.dataset.language === "πΊπ¦") {
          btn.dataset.language = 'ukrainian'
        } else {
          btn.dataset.language = 'english'
        }
        btn.ariaLabel = `${btn.dataset.language} toggle`;
      });
    }
  },[])

  const keyboardToggle = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onToggle(e.target.dataset.language);
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
