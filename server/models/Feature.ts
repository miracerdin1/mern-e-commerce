import mongoose from "mongoose";

interface IFeature {
  image: string;
}

const FeatureSchema = new mongoose.Schema<IFeature>(
  {
    image: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IFeature>("Feature", FeatureSchema);
