import axios from "axios";
import qs from "qs";

const instance = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/',
	timeout: 5000,
	headers: {'X-Custom-Header': 'foobar'}
});

export default instance;