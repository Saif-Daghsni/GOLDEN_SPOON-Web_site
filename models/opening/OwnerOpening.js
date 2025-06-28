import mongoose from 'mongoose';


const OpeningSchema = new mongoose.Schema(
 {
  image : String,
 },

 {
 collection : 'openings',
 }
)

const OwnerOpening = mongoose.model('OwnerOpening', OpeningSchema);
export default OwnerOpening;