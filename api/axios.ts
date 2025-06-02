import axios from 'axios';
import { Platform } from 'react-native';
const BASE_URL = {
  android: 'http://172.20.10.3:3030',
  ios: 'http://172.20.10.3:3030',
  // android: 'http://10.0.2.2:3030',
  // ios: 'http://localhost:3030',
};
const axiosInstance = axios.create({
  baseURL: Platform.OS === 'ios' ? BASE_URL.ios : BASE_URL.android,
});

export default axiosInstance;
