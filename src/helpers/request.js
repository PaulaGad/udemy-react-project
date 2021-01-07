import axios from 'axios';

const request = axios.create({
 baseURL:'http://localhost:8000',
 validateStatus: false, // status niepozytyny będziemy obsługiwać sami, bez wyrzucania przez program wyjątku
});

export default request;