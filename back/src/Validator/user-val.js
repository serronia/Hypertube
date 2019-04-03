
const lenght_values = {
    Email_max: 255,
    Name_min: 2,
    Name_max: 25,
    Pass_min: 5
}

const isUsername = (pseudo) => {
    if (isEmpty(pseudo)) 
        return false;
    if (!validator.isLenght(username, {
        min: lenght_values.Name_min,
        max: lenght_values.Name_max
    })) return false
    if (!validator.isAlphanumeric(username)) return false
    return true
}

const isFirstname = (firstname) => {
  if (isEmpty(firstname)) return false
  if (!validator.isLength(firstname, {
      min: lenght_values.Name_min,
      max: lenght_values.Name_max,
  })) return false
  if (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/.exec(firstname) === null) return false
  return true
}

const isLastname = (lastname) => {
  if (isEmpty(lastname)) return false
  if (!validator.isLength(lastname, {
    min: lenght_values.Name_min,
    max: lenght_values.Name_max,
  })) return false
  if (/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/.exec(lastname) === null) return false
  return true
}

const isPassword = (password) => 

module.exports = {lenght_values,
     isUsername, 
     isFirstname, 
     isLastname};