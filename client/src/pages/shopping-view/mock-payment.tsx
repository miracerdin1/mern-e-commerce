import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { capturePayment } from "@/store/shop/order-slice";
import { AppDispatch, RootState } from "@/store/store";
import { CreditCard, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function MockPayment() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  const { isLoading } = useSelector((state: RootState) => state.shopOrder);

  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "cardNumber":
        value = formatCardNumber(value);
        break;
      case "expiry":
        value = formatExpiry(value);
        break;
      case "cvv":
        value = value.replace(/[^0-9]/gi, "").substring(0, 3);
        break;
    }
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!orderId) {
      toast({
        title: "Hata",
        description: "Sipariş bulunamadı",
        variant: "destructive",
      });
      return;
    }

    if (cardData.cardNumber.replace(/\s/g, "").length < 16) {
      toast({
        title: "Hata",
        description: "Geçerli bir kart numarası giriniz",
        variant: "destructive",
      });
      return;
    }

    if (!cardData.cardName) {
      toast({
        title: "Hata",
        description: "Kart üzerindeki ismi giriniz",
        variant: "destructive",
      });
      return;
    }

    if (cardData.expiry.length < 5) {
      toast({
        title: "Hata",
        description: "Geçerli bir son kullanma tarihi giriniz",
        variant: "destructive",
      });
      return;
    }

    if (cardData.cvv.length < 3) {
      toast({
        title: "Hata",
        description: "Geçerli bir CVV giriniz",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await dispatch(
        capturePayment({
          orderId,
          payerId: `PAYER_${Date.now()}`,
          paymentId: `PAY_${Date.now()}`,
        }),
      ).unwrap();

      if (result.success) {
        navigate(`/shop/payment-success?orderId=${orderId}`);
      } else {
        toast({
          title: "Ödeme Hatası",
          description: "Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Ödeme Hatası",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  if (!orderId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">
              Geçersiz sipariş. Lütfen checkout sayfasına geri dönün.
            </p>
            <Button
              className="w-full mt-4"
              onClick={() => navigate("/shop/checkout")}
            >
              Checkout'a Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Güvenli Ödeme
          </CardTitle>
          <p className="text-gray-300 text-sm mt-2">
            Test kartı: 4242 4242 4242 4242
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-white">
              Kart Numarası
            </Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName" className="text-white">
              Kart Üzerindeki İsim
            </Label>
            <Input
              id="cardName"
              placeholder="AD SOYAD"
              value={cardData.cardName}
              onChange={(e) =>
                handleInputChange("cardName", e.target.value.toUpperCase())
              }
              className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-white">
                Son Kullanma
              </Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                maxLength={5}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-white">
                CVV
              </Label>
              <Input
                id="cvv"
                type="password"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={3}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 mt-4"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                İşleniyor...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Ödemeyi Tamamla
              </>
            )}
          </Button>

          <p className="text-center text-gray-400 text-xs mt-4">
            🔒 Bu bir demo ödemedir. Gerçek para çekilmez.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default MockPayment;
