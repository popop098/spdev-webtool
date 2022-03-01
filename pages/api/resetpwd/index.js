// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../../utils/dbConnect";
import UserAccounts from '../../../model/UserAccounts'
import PwdResetTokens from '../../../model/PwdResetTokens'
import bcrypt from "bcrypt";
import fetch from "isomorphic-unfetch";
import {useRouter} from "next/router";


export default async (req,res) => {
    const { method } = req;
    dbConnect()
    switch (method){
        case 'POST':
            try {
                const user_id = await PwdResetTokens.findOne({
                    uuid:req.body.uuid
                })
                console.log(user_id)
                const update = await UserAccounts.updateOne({email:user_id.email},{$set: {password: String(bcrypt.hashSync(req.body.pwd, 10))}})
                if(!update){
                    return res.status(404).json({
                        message: 'Invalid token'
                    })
                }
                await PwdResetTokens.deleteOne({
                    uuid:req.body.uuid
                })
                return res.status(200).json({
                    message: 'Password updated successfully'})
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
