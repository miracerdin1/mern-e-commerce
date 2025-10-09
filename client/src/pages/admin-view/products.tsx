import { Fragment, useEffect, useState } from "react";
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
import { ProductFormData } from "@/pages/admin-view/types";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
} from "@/store/admin/products-slice";
import { AppDispatch, RootState } from "@/store/store.ts";
import { useToast } from "@/hooks/use-toast.ts";
import AdminProductTile from "@/pages/admin-view/product-tile.tsx";
import { IProduct } from "shared/src/IProduct.ts";

const initialFormData: ProductFormData = {
  image: null,
  title: "",
  description: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
  category: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);

  const { productList } = useSelector(
    (state: RootState) => state.adminProducts,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  function onSubmit(event: Event) {
    event.preventDefault();
    currentEditedId
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setFormData(initialFormData);
              setOpenCreateProductsDialog(false);
              setCurrentEditedId(null);
            }
          },
        )
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            console.log("data from add new product", data);
            if (data?.payload?.success) {
              dispatch(fetchAllProduct());
              setOpenCreateProductsDialog(false);

              setImageFile(null);
              setFormData(initialFormData);
              toast({
                title: "Product Added",
                description: "New product has been added successfully.",
                duration: 5000,
                variant: "default",
              });
              // setUploadedImageUrl("");
              setImageLoadingState(false);
            }
          },
        );
  }

  function handleDelete(getCurrentProductId: string) {
    // Dispatch delete action here
    console.log("Delete product with ID:", getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProduct());
      }
    });
  }

  function isFormValid() {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.brand.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.price > 0 &&
      formData.salePrice >= 0 &&
      formData.totalStock > 0 &&
      (formData.image !== null || uploadedImageUrl !== "")
    );
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  console.log("producList", productList);

  return (
    <Fragment>
      <div className=" w-full flex mb-5 justify-end ">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Button
        </Button>
      </div>
      <div className="grid gap-4 md:grdi-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem: IProduct) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          setOpenCreateProductsDialog(open);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
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
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            {openCreateProductsDialog && (
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={currentEditedId ? "Edit" : "Add"}
                isBtnDisabled={!isFormValid()}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
