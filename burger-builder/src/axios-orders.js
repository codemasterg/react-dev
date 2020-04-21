import axios from 'axios';
/**
 * Example of creating an axios instance so that any previously established global defaults,
 * say in index.js can be overridden or just a URL specific instance used to satify
 * config for a rest service.
 * 
 * note that google firebase DB is being used/
 */
const dbInstance = axios.create({
    baseURL: 'https://react-my-burger-fc12a.firebaseio.com/',
});

export default dbInstance;