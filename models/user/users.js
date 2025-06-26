import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,      
  location: String,   
});

const userModel = mongoose.model("users", usersSchema);

export default userModel;
