import PwdResetTokens from '../../model/PwdResetTokens';
import UrlApiAccounts from '../../model/UrlApiAccounts';
import Useraccounts from '../../model/UserAccounts';
import DiscordWebhooks from '../../model/DiscordWebhooks'
import dbConnect from "../../utils/dbConnect";
import {getSession} from "next-auth/react";


export default async (req,res)=>{
    const { method } = req;
    await dbConnect()
    switch (method){
        case 'POST':
            try{
                const session = await getSession({ req });
                if(session){
                    await PwdResetTokens.deleteOne({id:session.user.id});
                    await Useraccounts.deleteOne({id:session.user.id});
                    await UrlApiAccounts.deleteOne({id:session.user.id});
                    await DiscordWebhooks.deleteOne({id:session.user.id});
                    return res.status(200).json({message:"Account deleted"});
                } else {
                    return res.status(401).json({message:"Unauthorized"});
                }
            } catch (error) {
                return res.status(500).json({message:"Server error"});
            }
        default:
            res.status(405).json({message:"Method not allowed"});

    }
}
