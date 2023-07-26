import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  startedAt: Yup.string().required('Required'),
  finishedAt: Yup.string(),
});
