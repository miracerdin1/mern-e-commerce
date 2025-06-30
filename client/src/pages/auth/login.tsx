import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form.tsx";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store.ts";
import { useToast } from "@/hooks/use-toast.ts";

const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState<Record<string, any>>(initialState);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("formData", formData);
    dispatch(loginUser(formData)).then((data) => {
      console.log("data", data);
      if (data?.payload?.success) {
        toast({
          title: data.payload?.message,
        });
      } else {
        toast({
          title: data.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Dont have an account?
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
