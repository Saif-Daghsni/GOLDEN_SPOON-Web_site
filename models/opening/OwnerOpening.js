import mongoose from 'mongoose';
import { Buffer } from 'buffer';


const ownerOpeningSchema = new mongoose.Schema({
    image: {
    data: Buffer,
    contentType: String,
  },
})

const OwnerOpening = mongoose.model('OwnerOpening', ownerOpeningSchema);
export default OwnerOpening;