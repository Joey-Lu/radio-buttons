import React, { useState, useEffect, createRef } from "react";
import ButtonGroup from "./ButtonGroup";

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

    //save next group buttons disabled status
    result[currentGroup].map(item => {
      if (item.id === selectedId){
        item.nextDisabled = rules[selectedId]
          ? (rules[selectedId].filter(j => (j.toString()[0] - selectedId.toString()[0]) <= 1))
          : item.nextDisabled;
      }
    });

    result[currentGroup].map(item => {
      //set other buttons
      if (item.id !== selectedId) {
        item.disabled = true;
      }
      //set next group only if current group id is less than group number
      if (item.nextDisabled && (currentGroup < result.length-1)) {
        result[currentGroup+1].map(i => {
          if (!item.nextDisabled.includes(parseInt(i.id))) {
            i.disabled = false;
            const ruleRromLastGroup = item.nextDisabled.filter(
              j => (j.toString()[0] - i.toString()[0]) <= 1
            )
            const ownRule = rules[selectedId] || []; 
            //merge rules from previous group in to current group
            i.nextDisabled = [...ruleRromLastGroup,...ownRule];
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
