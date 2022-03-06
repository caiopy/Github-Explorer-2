import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient()

export const api = axios.create({
  baseURL: 'https://api.github.com/users',
})