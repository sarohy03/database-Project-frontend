function signupValidation(values) {
    const errors = {};
  

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    else{
      errors.email = '';

    }
  
    if (!values.name) {
      errors.name = 'Name is required';
    }
    else{
      errors.name = '';

    }
  
    
  
    return errors;
  }
  
  export default signupValidation;
  