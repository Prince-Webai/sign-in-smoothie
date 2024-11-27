import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      <p className="text-gray-600 mb-8">
        You are now signed in. This is your dashboard page.
      </p>
      
      {/* Audio Widget */}
      <div className="w-full flex justify-center">
        <iframe
          id="audio_iframe"
          src="https://widget.synthflow.ai/widget/v2/1732709535656x106076296295796180/1732709535490x155243776876791580"
          allow="microphone"
          width="400"
          height="600"
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Index;
