import React, { useState} from "react";
import ButtonGroup from "./ButtonGroup";
// import './RadioButtons.css';

const RadioButtons = ({ menus, rules }) => {
  const [stage,setStage] = useState(0);
  const [disabledArray, setDisabledArray] = useState(() => {
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

    setStage(currentGroup);
    result[currentGroup].forEach(curr=>{
      if(curr.id !== selectedId){ // set other buttons in the same group to disable
        curr.disabled = true
      }else{
        if(currentGroup < result.length-1){
          result[currentGroup+1].forEach(next=>{ // check if the button in the next group ii within the rule
            if(!curr.rule.includes(parseInt(next.id))){
              next.disabled = false;
              next.rule = [...next.rule,...curr.rule] //comebine next rule with the rule from current one 
            }
          })
        }
      }
    })
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
      <button disabled = {stage !== 2}>Submit</button>
    </div>
  );
};

export default RadioButtons;
