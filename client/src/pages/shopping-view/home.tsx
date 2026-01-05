import { ProductDetailsDialog } from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { getFeatureImages } from "@/store/common-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { AppDispatch, RootState } from "@/store/store.ts";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";

function ShoppingHome() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const { productList, productDetails } = useSelector(
    (state: RootState) => state.shopProducts
  );

  const navigate = useNavigate();
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = [
    {
      image: bannerOne,
      title: "Banner 1",
      description: "Banner 1 Description",
    },
    {
      image: bannerTwo,
      title: "Banner 2",
      description: "Banner 2 Description",
    },
    {
      image: bannerThree,
      title: "Banner 3",
      description: "Banner 3 Description",
    },
  ];

  function handleNavigateTotListingPage(
    getCurrentItem: string,
    section: string
  ) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(id: string) {
    dispatch(fetchProductDetails(id));
  }

  function handleAddtoCart(getCurrentProductId: string) {
    if (!user?.id) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    )
      .unwrap()
      .then((data) => {
        if (data?.success) {
          dispatch(fetchCartItems({ userId: user.id }));
          toast({
            title: "Product is added to cart",
          });
        }
      });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const categoriesWithIcons = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandsWithIcons = [
    { id: "nike", label: "Nike", icon: ShirtIcon },
    { id: "adidas", label: "Adidas", icon: CloudLightningIcon },
    { id: "puma", label: "Puma", icon: BabyIcon },
    { id: "levi", label: "Levi's", icon: WatchIcon },
    { id: "zara", label: "Zara", icon: UmbrellaIcon },
    { id: "h&m", label: "H&M", icon: WatchIcon },
  ];

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlideIndex ? "opacity-100" : "opacity-0"}`}
            src={slide.image}
            alt={slide.title}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlideIndex(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-white/80"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlideIndex(
              (prev) => (prev + 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-white/80"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateTotListingPage(categoryItem.id, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                key={categoryItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">
                    {categoryItem.label}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcons.map((brandItem) => (
              <Card
                onClick={() =>
                  handleNavigateTotListingPage(brandItem.id, "brand")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                key={brandItem.id}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold">{brandItem.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature products
          </h2>
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList && productList.length > 0 ? (
              productList.map((product) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddtoCart}
                  key={product._id}
                  product={product}
                />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
