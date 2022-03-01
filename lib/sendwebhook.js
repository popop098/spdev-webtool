import {Webhook} from "discord-webhook-node";

export default function SendWebHook({type,url,title,fieldname,fieldvalue}){
    console.log(type,url,title,fieldname,fieldvalue);
    const hook = new Webhook(url);
    const IMAGE_URL = 'https://media.discordapp.net/attachments/912486976777760784/946567759024750642/webtool.png';
    hook.setUsername('WebTool');
    hook.setAvatar(IMAGE_URL);
    if(type==="success"){
        hook.success(`**${title}**`, fieldname, fieldvalue)
    } else if(type==="fail"){
        hook.error(`**${title}**`, fieldname, fieldvalue)
    }

}
