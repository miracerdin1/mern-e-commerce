import { AddressFormData } from "@/types/address-form-data.interface";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AddressCard({
  addressInfo,
  handleDelete,
  handleEdit,
}: {
  addressInfo: AddressFormData;
  handleDelete: (addressInfo: AddressFormData) => void;
  handleEdit: (addressInfo: AddressFormData) => void;
}) {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pin Code: {addressInfo.pinCode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
