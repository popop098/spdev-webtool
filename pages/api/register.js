// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../utils/dbConnect";
import Useraccounts from '../../model/useraccounts'
import UrlApiAccounts from '../../model/urlapiaccounts'
import bcrypt from "bcrypt";
import uuidAPIKey from "uuid-apikey";

dbConnect()

export default async (req,res) => {
    const { method } = req;
    switch (method){
        case 'POST':
            console.log(req.body)
            try {
                const uuidAPIKey = require('uuid-apikey');
                const available = await Useraccounts.findOne({"id":String(req.body.id)})
                if(available){
                    // console.log(await Account.findOne({id:String(req.body.id)}).select('password'))
                    return res.status(400).json({success:false})
                }
                const hash = bcrypt.hashSync(req.body.pwd, 10);
                const keygen = uuidAPIKey.create();
                const token = keygen.apiKey;
                const uuid = keygen.uuid;
                await UrlApiAccounts.create({
                    id:req.body.id,
                    token:token,
                    uuid:uuid
                })
                const account = await Useraccounts.create({
                    "id":req.body.id,
                    "password":String(hash),
                    "email":req.body.email
                })
                res.status(201).json({success:true,data:account})
                return
            }catch (error){
                console.log(error)
                res.status(400).json({success:false})
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
