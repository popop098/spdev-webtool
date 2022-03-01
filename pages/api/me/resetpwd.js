// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../../utils/dbConnect";
import useraccounts from '../../../model/UserAccounts'
import bcrypt from "bcrypt";
import {getSession} from "next-auth/react";
import UserLogs from "../../../model/UserLogs";

dbConnect()
export default async (req,res) => {
    const { method } = req;
    switch (method){
        case 'POST':
            try {
                const session = await getSession({req})
                if(session){
                    const update = await useraccounts.updateOne({email:session.user.email},{$set: {password: String(bcrypt.hashSync(req.body.pwd, 10))}})
                    if(!update){
                        return res.status(404).json({
                            message: 'Invalid token'
                        })
                    }
                    await UserLogs.WriteLog(session.user.id, 'success', `비밀번호가 변경되었습니다.`)
                    return res.status(200).json({
                        message: 'Password updated successfully'})
                }

            }catch (error){
                console.log(error.message)
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
