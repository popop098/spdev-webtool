// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../../utils/dbConnect";
import Pwdresettokens from '../../../model/PwdResetTokens'

dbConnect()
export default async (req,res) => {
    const { method,query:{token,uuid} } = req;
    switch (method){
        case 'GET':
            try{
                console.log(token,uuid)
                const available = await Pwdresettokens.findOne({
                    token:token,
                    uuid:uuid
                })
                if(available) {

                    return res.status(200).json({
                        status:200,
                        message:'Token is valid'
                    }).then(
                        {
                            redirect: {permanent: false,
                                destination:'/resetpwd?uuid='+uuid}
                        }
                    )
                    //res.writeHead(200, {'Location':process.env.CALLBACKURL+'resetpwd?uuid='+uuid})
                }
                else{
                    res.status(404).json({
                        message: 'Invalid token'
                    })
                }
            }catch (e) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            break;
        case 'PUT':
            try{
                await Pwdresettokens.deleteOne({
                    id:req.body.id
                }).then(()=>{
                    res.status(200).json({
                        message: 'Token deleted'
                    })
                })
            }catch (e) {
                res.status(500).json({
                    message: 'Internal server error'
                })
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}
