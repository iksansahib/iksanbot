const { RTMClient } = require('@slack/client');
const witClient = require('./witClient');
let rtm = null;
let witResponse = null;
// An access token (from your Slack app or custom integration - usually xoxb)

handleOnAuth = (rtmStartData) => {
    console.log(`Connect to ${rtmStartData.self.name}, ${rtmStartData.team.name}`);
}

handleOnMessage = async (message) => {
    witResponse = await witClient.ask(message.text);
    console.log(witResponse.data.entities);
    if(!witResponse.data.entities.Intent){
        rtm.sendMessage('ga ngerti cuy, baru bisa jawab klo situ nanya jam brp di daerah mana', message.channel);
        return;
    } else if(!witResponse.data.entities.location){
        rtm.sendMessage('ga ngerti cuy, baru bisa jawab klo situ nanya jam brp di daerah mana', message.channel);
        return;
    } else {
        let date = new Date();
        let jam = date.toLocaleString(
            'id-ID', { 
                hour: '2-digit', 
                hour12:true,
                timeZone: witResponse.data.entities.location[0].resolved.values[0].timezone
            });
        rtm.sendMessage(`udah jam ${jam} sekarang di ${witResponse.data.entities.location[0].resolved.values[0].name}`, message.channel);
        return;
            
    }
}

addAuthHandler = (rtm, handler) => {
    rtm.on('authenticated', handler);
}

addMessageHandler = (rtm, handler) => {
    rtm.on('message', handler);
}
// The client is initialized and then started to get an active connection to the platform
module.exports.init = function slackClient(token,logLevel){
    rtm = new RTMClient(token, {logLevel});
    addAuthHandler(rtm, handleOnAuth);
    addMessageHandler(rtm, handleOnMessage);
    return rtm;    
};

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// const conversationId = 'ACXUBKLQN';

// // The RTM client can send simple string messages
// rtm.sendMessage('Hello there', conversationId)
//   .then((res) => {
//     // `res` contains information about the posted message
//     console.log('Message sent: ', res.ts);
//   })
//   .catch(console.error);