import {object} from 'yup';
import {validateForm} from './validate';

export const validationSchemaName = object().shape({
  first_name: validateForm().first_name,
  last_name: validateForm().last_name,
  addition: validateForm().addition,
});

export const validationSchemaEmail = object().shape({
  email: validateForm().email,
});
