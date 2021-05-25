export const clearObj = (obj: any, removeSpace: boolean = false) => {
  const dep = Object.create({});
  Object.keys(obj).forEach((key) => {
    if (obj[key] != undefined && obj[key] != null) {
      dep[key] = obj[key];
    } else if(obj[key] == '') {
      if(removeSpace) {
        return true;
      } else {
        dep[key] = obj[key];
      }
    }
  });
  return dep;
};
