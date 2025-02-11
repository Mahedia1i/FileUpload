import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  signature: { type: String, required: true },
  time: {
    type: Date,
    default: () => new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000),
  },
});

const Demo = mongoose.model("Demo", demoSchema);
export default Demo;
