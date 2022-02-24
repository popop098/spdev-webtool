// https://www.youtube.com/watch?v=ahAilJEe-_A&list=PL_kAgwZgMfWx0ToY-XKCcAm9JH5UlTA-W&index=2&ab_channel=JasonRivera
import dbConnect from "../../../utils/dbConnect";
import Pwdresettokens from '../../../model/pwdresettokens'

dbConnect()
export default async (req,res) => {
    const { method } = req;
    switch (method){
        case 'POST':
            try{
                const available = await Pwdresettokens.findOne({
                    uuid:req.body.uuid
                })
                if(available) {
                    res.status(200).json({
                        status:200,
                        id:available.id
                    })
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
        default:
            res.status(400).json({success:false});
            break;
    }
}
