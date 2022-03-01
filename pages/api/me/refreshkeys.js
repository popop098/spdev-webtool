import dbConnect from '../../../utils/dbConnect'
import UrlApiAccounts from '../../../model/UrlApiAccounts'
import rateLimit from '../../../utils/rate-limit'
import requestIp from 'request-ip'
import {getSession} from "next-auth/react";
import UserLogs from "../../../model/UserLogs";
import SendWebHook from "../../../lib/sendwebhook";
import DiscordWebhooks from "../../../model/DiscordWebhooks";
import {useState} from "react";
import moment from 'moment'
import 'moment/locale/ko';
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async (req,res)=>{
    const { method } = req;
    await dbConnect()
    switch (method){
        case 'POST':
            //const [db,setdb] = useState(null)
            const session = await getSession({req})
            try{
                if(!session){
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    })
                }
                const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
                console.log(ip)
                const uuidAPIKey = require('uuid-apikey');
                const keygen = uuidAPIKey.create();
                const token = keygen.apiKey;
                const uuid = keygen.uuid;
                await limiter.check(res, 3, 'ResetToken')
                await UrlApiAccounts.findOneAndUpdate({id:session.user.id},{$set:{uuid:uuid,token:token}},async function (err, doc) {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: err.message
                        })
                    }
                }).clone().catch(function(err){ console.log(err)})
                const user_log = await UserLogs.create({id:session.user.id, statue:'success',description:`API 키가 재발급되었습니다.`,created_at:moment().format('YYYY-MM-DD HH:mm:ss')})
                await DiscordWebhooks.findOne({id:session.user.id},async function (err, doc) {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: err.message
                        })
                    } else {
                        console.log(doc)
                        if(doc.isuse){
                            await SendWebHook({
                                type:'success',
                                url:doc.webhookurl,
                                title:'API키 재발급 요청',
                                fieldname:'설명',
                                fieldvalue:`${session.user.id}님의 API 키가 재발급되었습니다.`
                        })
                        }
                        return res.status(200).json({
                            status: 200,
                            message: 'Successfully updated',
                            data: user_log
                        })
                    }
                }).clone().catch(function(err){ console.log(err)})
                //console.log(webhook)

            } catch (e) {
                console.log(e)
                await UserLogs.create({id:session.user.id, statue:'fail',description:`API 키발급이 레이트리밋되었습니다.`,created_at:moment().format('YYYY-MM-DD HH:mm:ss')
            })
                return res.status(429).json({ error: 'Rate limit exceeded' })
            }
            break;
        default:
            return res.status(405).json({
                status:405,
                message:'Method not allowed'
            })
    }

}
