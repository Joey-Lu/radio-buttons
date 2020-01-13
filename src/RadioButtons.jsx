import React, { useState} from "react";
import ButtonGroup from "./ButtonGroup";
// import './RadioButtons.css';

const RadioButtons = ({ menus, rules }) => {
  const [disabledArray, setDisabledArray] = useState(() => {
    let disabledArray = [];
    for (let i = 0; i < menus.length; i++) {
      disabledArray.push([]);
      if (i === 0) {
        menus[i].forEach(ele =>
          disabledArray[i].push({
            id: ele.id,
            disabled: false
          })
        );
      } else {
        menus[i].forEach(ele =>
          disabledArray[i].push({
            id: ele.id,
            disabled: true
          })
        );
      }
    }
    return disabledArray;
  });

  const handleClick = selectedId => {
    let currentGroup = selectedId.charAt(0) - 1;
    const result = Array.from(disabledArray);
    result[currentGroup].map(item => {
      //set nextDisabled
      if (item.id !== selectedId) {
        item.disabled = true;
      }else{
        if(!item.nextDisabled){
          item.nextDisabled = rules[item.id] || [];
        }
      }

      //set next group only if current group id is less than group number
      if (item.nextDisabled && (currentGroup < result.length - 1)) {
        result[currentGroup + 1].map(i => {
          if (!item.nextDisabled.includes(parseInt(i.id))) {
            i.disabled = false;
            const ruleRromLastGroup = item.nextDisabled.filter(
              j => Math.abs(j.toString()[0] - i.id.toString()[0]) > 0
            );
            const ownRule = rules[i.id] || [];
            //merge rules from previous group in to current group
            i.nextDisabled = [...ruleRromLastGroup, ...ownRule];
          }
        });
      }
    });
    console.log(result)
    setDisabledArray(result);
  };

  return (
    <div>
      {menus.map((menu, index) => {
        return (
          <ButtonGroup
            handleClick={handleClick}
            key={index}
            data={menu}
            disabledIds={disabledArray[index]}
          />
        );
      })}
    </div>
  );
};

export default RadioButtons;
