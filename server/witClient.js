const axios = require('axios');
const { witToken } = require('../global');
module.exports.ask = (message) => {
    let res = null
    res = axios.get(`https://api.wit.ai/message?v=20180920&q=${message}`,{
        headers : {
            'Authorization': `Bearer ${witToken}`
        }
    });
    return res;
}