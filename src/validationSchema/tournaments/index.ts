import * as yup from 'yup';

export const tournamentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  organization_id: yup.string().nullable().required(),
});
