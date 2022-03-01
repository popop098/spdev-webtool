// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../utils/dbConnect";
import Useraccounts from '../../model/UserAccounts'
import bcrypt from "bcrypt";
import SendWebHook from "../../lib/sendwebhook";
import DiscordWebhooks from "../../model/DiscordWebhooks"
import UserLogs from "../../model/UserLogs"
export default async (req,res) => {
    const { method } = req;
    await dbConnect();
    switch (method){
        case 'POST':
            try {
                console.log(req.body)
                await Useraccounts.findOne({id:req.body.id},async function (err, doc) {
                    console.log(doc)
                    if (doc) {
                        const UserPwd = doc.password
                        const CheckPwd = bcrypt.compareSync(req.body.pwd, UserPwd);
                        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
                        console.log(CheckPwd)
                        if (CheckPwd) {

                            await UserLogs.WriteLog(req.body.id, 'success', `${ip}에서 로그인되었습니다.`)
                            res.status(200).json({
                                success: true, data: {
                                    "id": doc.id,
                                    "email": doc.email,
                                    "role": doc.role
                                }
                            })
                            res.end()
                        } else {
                            await UserLogs.WriteLog(req.body.id, 'fail', `${ip}에서 로그인을 시도하였으나 실패하였습니다.`)
                            res.status(401).json({success: false})
                        }
                    } else {
                        res.status(401).json({success: false})
                    }
                }).clone().catch(function(err){ console.log(err)})
                // const hash = bcrypt.hashSync(req.body.pwd, 10);
                // const account = await Account.create({
                //     "id":req.body.id,
                //     "password":String(hash),
                //     "email":req.body.email,
                //     "role":req.body.role
                // })
                // res.status(201).json({success:true,data:account})
                // return
            }catch (error){
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
