import mongoose from 'mongoose';

const emailSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('EmailSubscriber', emailSubscriberSchema);
