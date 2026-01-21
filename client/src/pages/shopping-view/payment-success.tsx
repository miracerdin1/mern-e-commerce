import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clearCart } from "@/store/shop/cart-slice";
import { getOrderDetails } from "@/store/shop/order-slice";
import { AppDispatch, RootState } from "@/store/store";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { orderDetails, isLoading } = useSelector(
    (state: RootState) => state.shopOrder,
  );

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
      dispatch(clearCart());
    }
  }, [dispatch, orderId]);

  if (!orderId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">Sipariş bulunamadı.</p>
            <Button
              className="w-full mt-4"
              onClick={() => navigate("/shop/home")}
            >
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ödeme Başarılı!
            </h1>
            <p className="text-gray-600 mb-6">
              Siparişiniz başarıyla oluşturuldu ve ödemeniz alındı.
            </p>

            {!isLoading && orderDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Sipariş Özeti
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sipariş No:</span>
                    <span className="font-medium">
                      {orderDetails._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ürün Sayısı:</span>
                    <span className="font-medium">
                      {orderDetails.cartItems?.length || 0} adet
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Tutar:</span>
                    <span className="font-bold text-green-600">
                      ${orderDetails.totalAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ödeme Durumu:</span>
                    <span className="font-medium text-green-600">Ödendi ✓</span>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/shop/account")}
              >
                Siparişlerimi Görüntüle
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/shop/home")}
              >
                Alışverişe Devam Et
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Sipariş onay e-postanız kısa süre içinde gönderilecektir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccess;
