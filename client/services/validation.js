import { confirmed, email, min, required } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import forEach from 'lodash/forEach';
import { messages } from 'vee-validate/dist/locale/en.json';

const alphanumerical = {
  validate: value => (/\d/.test(value) && /[a-zA-Z]/.test(value)),
  message: 'The {_field_} field must contain at least 1 letter and 1 numeric value.'
};

const nochar = {
  validate: value => (!/[a-zA-Z]/.test(value)),
  message: 'The {_field_} can\'t contain any letters.'
};

const rules = {
  alphanumerical,
  confirmed,
  email,
  min,
  nochar,
  required
};

forEach(rules, (value, key) => {
  extend(key, {
    ...value,
    message: messages[key]
  });
});
