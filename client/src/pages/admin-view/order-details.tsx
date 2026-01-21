import CommonForm from "@/components/common/form";
import { DialogContent } from "@/components/ui/dialog";
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid- gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order ID:</p>
            <Label className="">#123456</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Date:</p>
            <Label className="">2022-01-01</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Status:</p>
            <Label className="">Completed</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-semibold">Order Price:</p>
            <Label className="">$100</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Order Details:</p>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="font-semibold">Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <p className="font-medium">Shipping Information:</p>
            <div className="grid gap-0.5 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Name:</span>
                <span>John Doe</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Address:</span>
                <span>123 Main St</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">City:</span>
                <span>City</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">State:</span>
                <span>State</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Zip Code:</span>
                <span>12345</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Country:</span>
                <span>Country</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <CommonForm
            formControls={[
              {
                name: "status",
                label: "Order Status",
                placeholder: "Select Order Status",
                type: "select",
                componentType: "select",
                options: [
                  {
                    text: "pending",
                    value: "Pending",
                  },
                  {
                    text: "inProcess",
                    value: "In Process",
                  },
                  {
                    text: "inShipping",
                    value: "In Shipping",
                  },
                  {
                    text: "rejected",
                    value: "Rejected",
                  },
                  {
                    text: "delivered",
                    value: "Delivered",
                  },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
