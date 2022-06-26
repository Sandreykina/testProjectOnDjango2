import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const getApi = axios.create({
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: "X-CSRFTOKEN",
    headers: {
        'X-CSRFToken': 'csrftoken',
    },
    baseURL: 'elena5645.pythonanywhere.com/api/',
})

export default getApi