const validateEmail = (email) => {
  let flag = false;
  if (email) {
    if (email.includes("@") && email.includes(".com")) {
      flag = true;
    }
  } else {
    flag = false;
  }
  return flag;
};

module.exports = { validateEmail };
