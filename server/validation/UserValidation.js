// validation/UserValidation.js
import { body } from "express-validator";

export const UserValidation = {
  name: {
    isLength: {
      options: { min: 2, max: 20 },
      errorMessage: "Name should be min 2 and max 20 characters",
    },
    notEmpty: {
      errorMessage: "Name should not be empty",
    },
    isString: {
      errorMessage: "Name should be a string",
    },
  },

  mobile: {
    isLength: {
      options: { min: 7, max: 15 },
    },
    notEmpty: {
      errorMessage: "Mobile should not be empty",
    },
  },

  email: {
    isEmail: {
      errorMessage: "Please provide a valid email address",
    },
    notEmpty: {
      errorMessage: "Email should not be empty",
    },
    isString: {
      errorMessage: "Email should be a string",
    },
  },

  dob: {
    isString: {
      errorMessage: "DOB should be a string",
    },
    notEmpty: {
      errorMessage: "DOB should not be empty",
    },
    isDate: {
      errorMessage: "Provide a valid DOB",
    },
  },

  password: {
    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: "Password must be between 8 and 20 characters",
    },
    matches: {
      options: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      ],
      errorMessage:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
};
