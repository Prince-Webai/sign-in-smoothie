import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/home");
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You have been signed out.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold">Welcome</h2>
            <p className="text-secondary-foreground mt-2">
              Sign in to your account or create a new one
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: "6px",
                  height: "40px",
                },
                input: {
                  borderRadius: "6px",
                  height: "40px",
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: 'rgb(var(--primary))',
                    brandAccent: 'rgb(var(--primary))',
                  },
                },
              },
            }}
            providers={["google", "github"]}
            redirectTo={window.location.origin + "/home"}
          />
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex w-1/2 bg-primary/5 items-center justify-center p-8">
        <img
          src="/lovable-uploads/26cfda1f-c418-43b1-9a0a-37dec7cab0af.png"
          alt="Login illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Login;