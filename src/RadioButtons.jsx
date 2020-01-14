import React, { useState} from "react";
import ButtonGroup from "./ButtonGroup";
// import './RadioButtons.css';

const RadioButtons = ({ menus, rules }) => {
  const [disabledArray, setDisabledArray] = useState(() => {
    // 
    let disabledArray = [];
    for (let i = 0; i < menus.length; i++) {
      disabledArray.push([]);
      if (i === 0) {
        menus[i].forEach(ele =>
          disabledArray[i].push({
            id: ele.id,
            disabled: false,
            rule:rules[ele.id] || [] //set rule for each raio
          })
        );
      } else {
        menus[i].forEach(ele =>
          disabledArray[i].push({
            id: ele.id,
            disabled: true,
            rule:rules[ele.id] || []
          })
        );
      }
    }
    return disabledArray;
  });

  const handleClick = selectedId => {
    let currentGroup = selectedId.charAt(0) - 1;
    const result = Array.from(disabledArray);

    result[currentGroup].forEach(curr=>{
      if(curr.id !== selectedId){
        curr.disabled = true
      }else{
        result[currentGroup+1].forEach(next=>{
          if(!curr.rule.includes(parseInt(next.id))){
            next.disabled = false;
            next.rule = [...next.rule,...curr.rule]
          }
        })
      }
    })
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
