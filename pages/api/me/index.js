import UrlApiAccounts from '../../../model/UrlApiAccounts'
import dbConnect from "../../../utils/dbConnect";
import {useState} from "react";
import {getSession} from "next-auth/react";
//create api structure
dbConnect()
export default async (req,res)=>{
    const { method } = req;
    switch (method){
        case 'GET':
            try{
                const session = await getSession({req})
                if(session){
                    await UrlApiAccounts.findOne({id:session.user.id},function (err, data) {
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
        default:
            res.status(405).json({
                message: 'Method not allowed'
            })
            break;
    }
}

