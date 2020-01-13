import React, { memo, useState, useEffect, useCallback, useMemo } from "react";

const DefaultButtonGroup = memo(
  ({ groupId, data,selected, enabledGroup,handleClick, disabledAttrs = {}, onSelect, ...rest }) => {

    return (
      <div>
        {data.map(item => {
          return (
            <button key={item.id} onClick = {()=>handleClick(item.id)} disabled={selected ===0 ? false:(selected === item.id ? false:true)}>
                {item.value}
            </button>
          );
        })}
      </div>
    );
  }
);

export default DefaultButtonGroup;
