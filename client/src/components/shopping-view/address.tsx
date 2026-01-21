import { addressFormControls } from "@/config";
import { toast } from "@/hooks/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { AppDispatch } from "@/store/store";
import { AddressFormData } from "@/types/address-form-data.interface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddressCard from "./address-card";

const initialFormData: AddressFormData = {
  address: "",
  city: "",
  pinCode: "",
  phone: "",
  notes: "",
};

interface AddressProps {
  selectedId?: string | null;
  setCurrentSelectedAddress?: (address: any) => void;
}

function Address({ selectedId, setCurrentSelectedAddress }: AddressProps) {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);
  const addressList = useSelector(
    (state: any) => state.shopAddress.addressList,
  );

  console.log("addressList", addressList);

  function handleManageAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialFormData);
      toast({
        title: "Address limit exceeded",
        variant: "destructive",
      });
      return;
    }

    if (currentEditedId !== null) {
      dispatch(
        editAddress({
          userId: user?.userId || user?.id || user?._id,
          addressId: currentEditedId,
          formData,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.userId || user?.id || user?._id));
          setCurrentEditedId(null);
          setFormData(initialFormData);
          toast({
            title: "Address updated successfully",
          });
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.userId || user?.id || user?._id,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.userId || user?.id || user?._id));
          setFormData(initialFormData);
          toast({
            title: "Address added successfully",
          });
        }
      });
    }
  }

  function handleDelete(getCurrentAddress: AddressFormData) {
    if (!getCurrentAddress._id) return;

    dispatch(
      deleteAddress({
        userId: user?.userId || user?.id || user?._id,
        addressId: getCurrentAddress._id || "",
      }),
    ).then((data) => {
      console.log("data", data);
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.userId || user?.id || user?._id));
        toast({
          title: "Address deleted successfully",
          variant: "default",
        });
      }
    });
  }

  function handleEdit(getCurrentAddress: AddressFormData) {
    if (!getCurrentAddress._id) return;

    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pinCode: getCurrentAddress?.pinCode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) =>
        key !== "notes"
          ? formData[key as keyof AddressFormData].trim() !== ""
          : true,
      )
      .every((item) => item);
  }

  useEffect(() => {
    if (user?.userId || user?.id)
      dispatch(fetchAllAddresses(user?.userId || user?.id));
  }, [dispatch, user]);

  return (
    <Card>
      <div className="m-b-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList?.map((address: any) => (
              <AddressCard
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                key={address._id}
                addressInfo={address}
                isSelected={selectedId === address._id}
                onSelect={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add new address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-p-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
          isFormValid={isFormValid()}
        ></CommonForm>
      </CardContent>
    </Card>
  );
}

export default Address;
