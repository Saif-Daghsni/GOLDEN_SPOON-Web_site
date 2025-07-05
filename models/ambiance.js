import mongoose from 'mongoose';

const AmbianceSchema = new mongoose.Schema({
  image: String,  
},
{
    collection : 'Ambiance',
});

const AmbianceModel = mongoose.model("OwnerAmbiances", AmbianceSchema);

export default AmbianceModel;
