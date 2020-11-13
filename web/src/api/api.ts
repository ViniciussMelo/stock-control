import Axios from "axios";

const { REACT_APP_URL_API } = process.env;

const api = Axios.create({
    baseURL: `${REACT_APP_URL_API}`
});

export {api};