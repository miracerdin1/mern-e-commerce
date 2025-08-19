import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.tsx";
import CommonForm from "@/components/common/form.tsx";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload.tsx";

const initialFormData: ProductFormData = {
  image: null,
  name: "",
  description: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
  category: "",
};

type ProductFormData = {
  image: null;
  name: string;
  description: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStock: number;
  category: string;
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Form Data Submitted:", data);

    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);
  };

  return (
    <Fragment>
      <div className=" w-full flex mb-5 justify-end ">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Button
        </Button>
      </div>
      <div className="grid gap-4 md:grdi-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => setOpenCreateProductsDialog(open)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add new Product</SheetTitle>
            <SheetDescription>
              Please fill out the form below to add a new product.
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
          />
          <div className="py-6">
            {openCreateProductsDialog && (
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText="Add"
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
