export const createDiabledOptionsArray = (menus,rules)=>{
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
  }