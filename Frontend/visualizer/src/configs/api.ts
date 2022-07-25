import Axios from 'axios';

export const dataClient = Axios.create({
  baseURL: 'http://localhost:8000/',
});
