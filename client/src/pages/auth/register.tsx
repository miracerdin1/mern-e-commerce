import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form.tsx";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store.ts";
import { useToast } from "@/hooks/use-toast.ts";

const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState<Record<string, any>>(initialState);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.sucesss) {
        toast({
          title: data.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log("formData", formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
