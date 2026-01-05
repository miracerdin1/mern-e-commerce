import { Request, Response } from "express";
import Feature from "../../models/Feature";

export const addFeatureImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { image } = req.body;

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error adding feature image",
    });
  }
};

export const getFeatureImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error fetching feature images",
    });
  }
};
