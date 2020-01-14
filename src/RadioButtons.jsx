import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import "./RadioButtons.css";
import { createDiabledOptionsArray } from "./utils";

const RadioButtons = ({ menus, rules }) => {
  const [stage, setStage] = useState(0);
  const [disabledArray, setDisabledArray] = useState(() => {
    return createDiabledOptionsArray(menus, rules);
  });

  const handleReset = () => {
    setDisabledArray(createDiabledOptionsArray(menus, rules));
  };

  const handleClick = selectedId => {
    let currentGroup = selectedId.charAt(0) - 1;
    const result = Array.from(disabledArray);

    setStage(currentGroup);
    result[currentGroup].forEach(curr => {
      if (curr.id !== selectedId) {
        // set other buttons in the same group to disable
        curr.disabled = true;
      } else {
        if (currentGroup < result.length - 1) {
          result[currentGroup + 1].forEach(next => {
            // check if the button in the next group ii within the rule
            if (!curr.rule.includes(parseInt(next.id))) {
              next.disabled = false;
              next.rule = [...next.rule, ...curr.rule]; //comebine next rule with the rule from current one
            }
          });
        }
      }
    });
    setDisabledArray(result);
  };

  return (
    <div className="container">
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
      <div className='button_group'>
        <button className='submit' disabled={stage !== 2}>Submit</button>
        <button className='reset' onClick={handleReset}>Result</button>
      </div>
    </div>
  );
};

export default RadioButtons;
