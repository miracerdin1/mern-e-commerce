import { Request, Response } from "express";
import Address from "../../models/Address";

const addAddress = async (req: Request, res: Response) => {
  try {
    const { userId, address, city, pinCode, phone, notes } = req.body;
    console.log("addAddress req.body:", req.body);
    if (!userId || !address || !city || !pinCode || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pinCode,
      phone,
      notes,
    });
    await newlyCreatedAddress.save();
    return res.status(201).json({ success: true, data: newlyCreatedAddress });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const fetchAllAddresses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }

    const addressList = await Address.find({ userId });
    if (!addressList) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    return res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const editAddress = async (req: Request, res: Response) => {
  try {
    const { userId, addressId } = req.params;
    const { formData } = req.body;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User and address id are required" });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User and address id are required" });
    }

    const deletedAddress = await Address.findByIdAndDelete({
      _id: addressId,
      userId,
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: deletedAddress });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { addAddress, deleteAddress, editAddress, fetchAllAddresses };
