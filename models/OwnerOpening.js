import mongoose from 'mongoose';

const ownerOpeningSchema = new mongoose.Schema({
   /* title : String ,
    description : String ,
    price : Number ,*/   
    image : String ,
})

const OwnerOpening = mongoose.model('OwnerOpening', ownerOpeningSchema);
export default OwnerOpening;