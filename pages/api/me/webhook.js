import DiscordWebhooks from '../../../model/DiscordWebhooks'
import dbConnect from "../../../utils/dbConnect";
import {getSession} from "next-auth/react";
import rateLimit from "../../../utils/rate-limit";
import {Webhook} from "discord-webhook-node";
//create api structure
const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})
dbConnect()
export default async (req,res)=>{
    const { method } = req;
    switch (method){
        case 'GET':
            try{
                const session = await getSession({req})
                if(session){
                    await DiscordWebhooks.findOne({id:session.user.id},function (err, data) {
                        if (err) {
                            res.status(500).json({
                                message: err.message
                            })
                        } else {
                            res.status(200).json({
                                message: 'Get data success',
                                data: data
                            })
                        }
                    }).clone().catch(function(err){ console.log(err)})
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
                // const UserData = useState({
                //     urldata:'',
                //     botdata:'',
                // })

            } catch (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            break;
        case 'POST':
            try{
                const session = await getSession({req})
                if(session){
                    await limiter.check(res, 3, 'UpdateWebhook')
                    await DiscordWebhooks.updateOne({id:session.user.id},{$set:{isuse:req.body.isuse,webhookurl:req.body.url}},function (err, data) {
                        if (err) {
                            res.status(500).json({
                                message: err.message
                            })
                        } else {
                            res.status(200).json({
                                message: 'Update data success',
                                data: data
                            })
                        }
                    }).clone().catch(function(err){ console.log(err)})
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
                // const UserData = useState({
                //     urldata:'',
                //     botdata:'',
                // })

            } catch (err) {
                res.status(429).json({
                    message: 'Too many requests'
                })
            }
            break;
        case 'PUT':
            try{
                const session = await getSession({req})

                if(session){
                    await limiter.check(res, 3, 'TestWebhook')
                    await DiscordWebhooks.findOne({id:session.user.id},function (err, data) {
                        if (err) {
                            res.status(500).json({
                                message: err.message
                            })
                        } else {
                            const hook = new Webhook(data.webhookurl);
                            const IMAGE_URL = 'https://media.discordapp.net/attachments/912486976777760784/946567759024750642/webtool.png';
                            hook.setUsername('WebTool');
                            hook.setAvatar(IMAGE_URL);
                            hook.success('**WebTool ????????? ??????**', '????????? ?????????', `${session.user.id}?????? ???????????? ????????????????????????.`)
                                .then(() => {
                                    return res.status(200).json({
                                        message: 'Test webhook success',
                                        data: data
                                    })
                                })
                                .catch(err => {
                                    return res.status(500).json({
                                        message: err.message
                                    })
                                })
                        }
                    }).clone().catch(function(err){ console.log(err)})
                } else {
                    res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
                // const UserData = useState({
                //     urldata:'',
                //     botdata:'',
                // })

            } catch (err) {
                res.status(429).json({
                    message: 'Too many requests'
                })
            }
            break;
        default:
            res.status(405).json({
                message: 'Method not allowed'
            })
            break;
    }
}

