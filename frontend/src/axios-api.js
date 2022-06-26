import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const getApi = axios.create({
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'X-CSRFToken': 'csrftoken',
    },
    baseURL: 'http://127.0.0.1:8000/api/',
})

export default getApi