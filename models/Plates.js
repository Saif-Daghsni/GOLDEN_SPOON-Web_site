import mongoose from 'mongoose';

const PlatesSchema = new mongoose.Schema({
  name: String,
  description: String,  
  price: Number,
  type: String,
  image: String,  
},
{
    collection : 'Plates',
});

const PlatesModel = mongoose.model("OwnerPlates", PlatesSchema);

export default PlatesModel;
