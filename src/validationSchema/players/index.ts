import * as yup from 'yup';

export const playerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  team_id: yup.string().nullable().required(),
});
