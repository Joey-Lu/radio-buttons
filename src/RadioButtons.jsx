import React, { useState, useEffect, createRef } from "react";
import ButtonGroup from "./ButtonGroup";

const RadioButtons = ({ menus, rules }) => {
  const [disabledArray, setDisabledArray] = useState(() => {
    let disabledArray = [];
    for (let i = 0; i < menus.length; i++) {
      disabledArray.push([]);
      if (i === 0) {
        menus[i].forEach(ele => disabledArray[i].push({ id:ele.id,disabled: false }));
      } else {
        menus[i].forEach(ele => disabledArray[i].push({ id:ele.id,disabled: true }));
      }
    }
    return disabledArray;
  });

  const handleClick = id => {
    console.log(id);
    //set other options in the same button group to disabled
    let groupId = id.charAt(0)-1;
    const arr =  Array.from(disabledArray)
    for(let i=0;i<arr.length;i++){
      if(groupId === i){
        arr[groupId].map(item=>{
          if(item.id !== id){
            item.disabled = true;
          }
        })
      }
    }
    groupId++;
    //set the next group based on the rules
    if(groupId < arr.length){
      arr[groupId].map(item=>{
        if(rules[id]){
          if(!rules[id].includes(parseInt(item.id))){
            item.disabled = false;
          }
        }
      })
    }
    setDisabledArray(arr)
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
