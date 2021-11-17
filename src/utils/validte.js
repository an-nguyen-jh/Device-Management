// const regExpPrototype = {
//   email: new RegExp(
//     /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]+/,
//     "g"
//   ),
//   password: new RegExp(/\w{6,}/),
//   // Match string with more than 6 characters(alphanumeric & underscore)
// };

function isValidEmail(email) {
  return new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]+/,
    "g"
  ).test(email);
}

function isValidPassword(password) {
  return new RegExp(/\w{6,}/).test(password);
}

export { isValidEmail, isValidPassword };
