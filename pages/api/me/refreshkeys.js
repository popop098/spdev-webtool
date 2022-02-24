import dbConnect from '../../../utils/dbConnect'
import UrlApiAccounts from '../../../model/UrlApiAccounts'
import rateLimit from '../../../utils/rate-limit'
import requestIp from 'request-ip'
import {getSession} from "next-auth/react";

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})
dbConnect()
export default async (req,res)=>{
    const { method } = req;
    switch (method){
        case 'POST':
            try{
                const session = await getSession({req})
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
                await limiter
                await UrlApiAccounts.findOneAndUpdate({id:session.user.id},{$set:{uuid:uuid,token:token}},function (err,doc) {
                    if(err){
                        return res.status(500).json({
                            status:500,
                            message:err.message
                        })
                    }else{
                        return res.status(200).json({
                            status:200,
                            message:'Successfully updated',
                            data:doc
                        })
                    }
                }).clone().catch(function(err){ console.log(err)})
            } catch (e) {
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
