const mongoose = require('mongoose')

const pwdresettokenSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: 'Please supply a email address',
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

module.exports = mongoose.models.pwdresettokens || mongoose.model('pwdresettokens', pwdresettokenSchema);
