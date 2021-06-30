import axios from 'axios';

// example of fetching user's todos via json placeholder api
export async function fetchTodos() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users/1/todos'
    );
    return response;
  } catch (error) {
    return error;
  }
}
