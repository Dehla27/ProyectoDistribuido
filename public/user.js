const bcrypt        = require('bcrypt');
const mongoose      = require('mongoose');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {type: String, require:true,unique:true},
    password: {type: String, require:true}
});

UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    } catch (error) {
      next(error);
    }
  }
  next();
});

UserSchema.methods.isCorrectPassword = async function(password, callback) {
  try {
    const same = await bcrypt.compare(password, this.password);
    callback(null, same);
  } catch (error) {
    callback(error);
  }
};

module.exports = mongoose.model('User', UserSchema);
