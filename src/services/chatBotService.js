import request from "request";
import sleep from 'await-sleep';
require('dotenv').config();


async function callSendTypingAPI(sender_psid) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

async function callSendMarkReadAPI(sender_psid) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

async function callSendAPI(sender_psid, response) {
    return new Promise(async (resolve, reject) => {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        await callSendMarkReadAPI(sender_psid);
        await callSendTypingAPI(sender_psid);
        //await sleep(5000)

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {
            if (!err) {
                resolve("ok")
                console.log('message sent!')
            } else {
                reject(err)
                console.error("Unable to send message:" + err);
            }
        });
    })
}

function getUserName(sender_psid) {
    // Send the HTTP request to the Messenger Platform
    return new Promise(async (resolve, reject) => {
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                let data = JSON.parse(body)
                let username = `${data.first_name} ${data.last_name}`
                resolve(username)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })
}

let handleStart = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getUserName(sender_psid)
            let response = { "text": `hello, welcome ${username}` }
            await callSendAPI(sender_psid, response)
            await callSendAPI(sender_psid, template())
            await callSendAPI(sender_psid, quickReply())

            resolve("done");
        } catch (error) {
            reject(error)
        }
    })
}

let handleMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {

            await callSendAPI(sender_psid, menuList())

            resolve("done");
        } catch (error) {
            reject(error)
        }
    })
}

let sendImage = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            await callSendAPI(sender_psid, imageResponse())
            resolve("done");
        } catch (error) {
            reject(error)
        }
    })
}

let sendReply = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            await callSendAPI(sender_psid, quickReply())
            resolve("done");
        } catch (error) {
            reject(error)
        }
    })
}


let template = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Is this the right picture?",
                    "subtitle": "Tap a button to answer.",
                    "image_url": "https://nld.mediacdn.vn/thumb_w/540/2019/12/18/photo-1-15766557582591091250057.jpg",
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Menu",
                            "payload": "menu",
                        },
                        {
                            "type": "postback",
                            "title": "Send Image",
                            "payload": "image",
                        },
                        {
                            "type": "web_url",
                            "url": process.env.URL_WEB_VIEW,
                            "title": "View",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        }
                    ],
                }]
            }
        }
    }
    return response
}

let imageResponse = () => {
    let response = {
        "attachment": {
            "type": "image",
            "payload": {
                "url": "https://nld.mediacdn.vn/thumb_w/540/2019/12/18/photo-1-15766557582591091250057.jpg",
                "is_reusable": true
            }
        }
    }
    return response
}

let menuList = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": "https://nld.mediacdn.vn/thumb_w/540/2019/12/18/photo-1-15766557582591091250057.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Menu",
                                "payload": "menu",
                            },
                            {
                                "type": "postback",
                                "title": "Help",
                                "payload": "help",
                            }
                        ],
                    },
                    {
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": "https://nld.mediacdn.vn/thumb_w/540/2019/12/18/photo-1-15766557582591091250057.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Menu",
                                "payload": "menu",
                            },
                            {
                                "type": "postback",
                                "title": "Help",
                                "payload": "help",
                            }
                        ],
                    },
                    {
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": "https://nld.mediacdn.vn/thumb_w/540/2019/12/18/photo-1-15766557582591091250057.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Menu",
                                "payload": "menu",
                            },
                            {
                                "type": "postback",
                                "title": "Help",
                                "payload": "help",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response
}

let quickReply = () => {
    let response = {
        "text": "Pick a color:",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Red",
                "payload": "red",
                "image_url": "http://example.com/img/red.png"
            }, {
                "content_type": "text",
                "title": "Green",
                "payload": "green",
                "image_url": "http://example.com/img/green.png"
            }
        ]
    }
    return response;
}

module.exports = {
    handleStart: handleStart,
    handleMenu: handleMenu,
    sendImage: sendImage,
    callSendAPI: callSendAPI,
    getUserName: getUserName,
    sendReply: sendReply
}