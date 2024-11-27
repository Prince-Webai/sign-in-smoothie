import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold">Login</h2>
            <p className="text-secondary-foreground mt-2">
              Doesn't have an account yet?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter 6 character or more"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or login with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Google Sign In",
                    description: "This feature is not implemented yet.",
                  });
                }}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Facebook Sign In",
                    description: "This feature is not implemented yet.",
                  });
                }}
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-4 h-4 mr-2"
                />
                Facebook
              </Button>
            </div>
          </form>
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