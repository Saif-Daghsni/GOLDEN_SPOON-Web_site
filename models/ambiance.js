import mongoose from 'mongoose';

const ambianceSchema = new mongoose.Schema({
  name: String,
  description: String,  
  price: Number,
  image: String,  
},
{
    collection : 'ambiance',
});

const ambianceModel = mongoose.model("OwnerAmbiances", ambianceSchema);

export default ambianceModel;
