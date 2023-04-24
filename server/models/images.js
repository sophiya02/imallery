const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'please provide image url']
  },
  label:{
    type: String
  },
  likes:{
    type: Number,
    defualt: 0
  },
  cloudinary_id:{
    type: String,
  }
  // createdBy: {
  //   type: mongoose.Types.ObjectId,
  //       ref: 'User',
  //       required: ['true', "please provide User"]
  // }
},{
    timestamps: true
  }
)
// Define a virtual property to store the value of `_id` in `id`
// ImageSchema.virtual('id').get(function() {
//   return this._id.toHexString();
// });

// // Ensure virtual fields are serialized
// ImageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Image', ImageSchema);
