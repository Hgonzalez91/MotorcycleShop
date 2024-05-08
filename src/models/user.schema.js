const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
    },email: {
        type: String, 
        required: true,
        unique: true
    },password: {
        type: String, 
        required: true
    },role: String
},{
    timestamps: true
});

UserSchema.methods.encryptPassword = async function(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)