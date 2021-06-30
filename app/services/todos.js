import axios from 'axios';

// example of fetching user's todos via json placeholder api
export async function fetchTodos() {
  try {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1/todos'
    );
    return data;
  } catch (error) {
    return error;
  }
}
