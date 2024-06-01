function loginValidation(values) {
    const errors = {};
  
    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    } else {
      errors.email = ""; // Reset error if email is valid
    }
  
    return errors;
}
export default loginValidation;
