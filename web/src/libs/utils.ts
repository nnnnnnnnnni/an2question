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

export const getFileType = (fileName: string) => {
  const arr = fileName.split(".");
  const suff = arr[arr.length - 1].toUpperCase();
  if (["DOC", "DOCX"].includes(suff)) {
    return "doc";
  } else if (["XLSX", "XLS"].includes(suff)) {
    return "excel";
  } else if (["BMP", "JPG", "JPEG", "PNG", "GIF"].includes(suff)) {
    return "img";
  } else if (["PDF"].includes(suff)) {
    return "pdf";
  } else if (["ZIP", "RAR"].includes(suff)) {
    return "zip";
  } else if (["PPT", "PPTX"].includes(suff)) {
    return "ppt";
  } else {
    return "other";
  }
};
