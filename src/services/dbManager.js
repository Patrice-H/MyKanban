import { useFetch } from '../utils/hooks';
import { apiBaseUrl } from '../utils/config';

export const GetTasksList = () => {
  const { data, message } = useFetch(`${apiBaseUrl}/api/tasks`);
  const tasksList = data && data;

  return { tasksList, message };
};
