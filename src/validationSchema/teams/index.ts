import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  team_manager_id: yup.string().nullable().required(),
});
