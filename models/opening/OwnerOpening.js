import mongoose from 'mongoose';

const ownerOpeningSchema = new mongoose.Schema({
    image : String ,
})

const OwnerOpening = mongoose.model('OwnerOpening', ownerOpeningSchema);
export default OwnerOpening;