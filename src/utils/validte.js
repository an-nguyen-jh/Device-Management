function isValidEmail(email) {
  const emailValidator = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]+/,
    "g"
  );
  return emailValidator.test(email);
}

function isValidPassword(password) {
  const passwordValidator = new RegExp(/\w{6,}/);
  return passwordValidator.test(password);
}

export { isValidEmail, isValidPassword };
