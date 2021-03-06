const mongoose = require('mongoose')

const UrlApiAccountSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: 'Please supply a id',
            trim: true
        },
        uuid: {
            type: String,
            required: 'Please supply a uuid',
            trim: true
        },
        token: {
            type: String,
            required: 'Please supply a token',
            trim: true
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

export default mongoose.models.UrlApiAccounts || mongoose.model('UrlApiAccounts', UrlApiAccountSchema);
