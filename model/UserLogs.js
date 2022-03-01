const mongoose = require('mongoose')
const UserLogSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: 'Please supply a id',
            trim: true
        },
        statue: {
            type: String,
            required: 'Please supply a uuid',
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        created_at: {
            type: String,
            required: 'Please supply a created_at',
        }
    }
)

// AccountSchema.methods.setPassword = async function (password) {
//     this.hashedPassword = await bcrypt.hash(password, 10);
// };
//
// AccountSchema.methods.checkPassword = async function (password) {
//     return await bcrypt.compare(password, this.hashedPassword); // true / false
// };
//
// AccountSchema.statics.findByUsername = function (username) {
//     return this.findOne({ username });
// };
UserLogSchema.statics.WriteLog = async function (id, statue, description) {
    return this.create({
        id: id,
        statue: statue,
        description: description
    })
}
export default mongoose.models.UserLogs || mongoose.model('UserLogs', UserLogSchema);
