import * as yup from 'yup';

export const matchValidationSchema = yup.object().shape({
  score_a: yup.number().integer().required(),
  score_b: yup.number().integer().required(),
  team_a_id: yup.string().nullable().required(),
  team_b_id: yup.string().nullable().required(),
  tournament_id: yup.string().nullable().required(),
  scorekeeper_id: yup.string().nullable().required(),
});
