import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import Button from "./Button";

const ButtonGroup = memo(
  ({
    data,
    disabledIds,
    handleClick,
    ...rest
  }) => {

    const isDisabled = id =>{
        return disabledIds.find(ele => ele.id === id).disabled
    }

    return (
      <div>
        {data.map(item => {
          return (
            <Button
              disabled ={isDisabled(item.id)}
              onSelect={handleClick}
              id={item.id}
              key={item.id}
              value={item.value}
              {...rest}
            >
              {item.value}
            </Button>
          );
        })}
      </div>
    );
  }
);

export default ButtonGroup;
