export const clearObj = (obj: any, removeSpace: boolean = false) => {
  const dep = Object.create({});
  Object.keys(obj).forEach((key) => {
    if (obj[key] == "") {
      if (removeSpace) {
        return true;
      } else {
        dep[key] = obj[key];
      }
    } else if (obj[key] != undefined && obj[key] != null) {
      dep[key] = obj[key];
    }
  });
  return dep;
};

export const isEmail = (mail: string) => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(mail);
};
export const isPhone = (phone: string) => {
  return /\d{3}-\d{8}|\d{4}-\{7,8}/.test(phone);
};
