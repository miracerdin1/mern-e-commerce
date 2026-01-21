import { AddressFormData } from "@/types/address-form-data.interface";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface AddressCardProps {
  addressInfo: AddressFormData;
  handleDelete: (addressInfo: AddressFormData) => void;
  handleEdit: (addressInfo: AddressFormData) => void;
  isSelected?: boolean;
  onSelect?: (addressInfo: AddressFormData) => void;
}

function AddressCard({
  addressInfo,
  handleDelete,
  handleEdit,
  isSelected = false,
  onSelect,
}: AddressCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all ${
        isSelected
          ? "border-2 border-primary bg-primary/5"
          : "border hover:border-primary/50"
      }`}
      onClick={() => onSelect?.(addressInfo)}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pin Code: {addressInfo.pinCode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
        {isSelected && (
          <span className="text-sm font-medium text-primary">
            ✓ Seçili Adres
          </span>
        )}
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(addressInfo);
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(addressInfo);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
