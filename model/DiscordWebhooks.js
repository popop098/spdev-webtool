const mongoose = require('mongoose')

const DiscordWebhookSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: 'Please supply a id',
            trim: true
        },
        isuse: {
            type: Boolean,
            required: 'Please supply a uuid',
            trim: true
        },
        webhookurl: {
            type: String,
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
DiscordWebhookSchema.statics.findByUserId = function (id) {
    return this.findOne({ id });
};
export default mongoose.models.DiscordWebhooks || mongoose.model('DiscordWebhooks', DiscordWebhookSchema);
