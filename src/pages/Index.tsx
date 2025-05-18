
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { FileText, PenLine } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-writer-secondary/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Capture Your Ideas With Clarity
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A distraction-free writing app designed for focus, creativity, and productivity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to={user ? "/dashboard" : "/login?tab=signup"}>
                    <Button size="lg" className="bg-writer-primary hover:bg-writer-primary/90">
                      {user ? "Go to Dashboard" : "Start Writing for Free"}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-writer-primary/10 p-6 rounded-xl border border-writer-primary/20">
                    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
                      <div className="flex items-center border-b pb-2 mb-4">
                        <PenLine className="w-5 h-5 text-writer-primary mr-2" />
                        <div className="text-sm font-medium">My Novel.docx</div>
                      </div>
                      <div className="text-sm space-y-3 leading-relaxed flex-1">
                        <p>
                          It was a dark and stormy night. The wind howled through the trees, sending shivers down my spine.
                        </p>
                        <p>
                          I knew I had to keep moving, but my legs felt heavy, like they were made of lead.
                        </p>
                        <p>
                          The path ahead was unclear, but one thing was certain: 
                          there was no going back.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background" id="features">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Designed to provide everything you need for a seamless writing experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <FileText className="h-8 w-8 text-writer-primary" />,
                  title: "Distraction-Free Writing",
                  description: "Focus on your words with our clean, minimal interface that removes all distractions."
                },
                {
                  icon: <PenLine className="h-8 w-8 text-writer-primary" />,
                  title: "Rich Text Formatting",
                  description: "Format your writing with headings, lists, bold, italic, and more without breaking your flow."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-writer-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
                  title: "Auto-Saving",
                  description: "Never lose your work again. Your documents are automatically saved as you write."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-writer-primary"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
                  title: "Document Management",
                  description: "Organize your writing with our intuitive document management system."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-writer-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M8 11h8"/><path d="M12 15V7"/></svg>,
                  title: "Secure Authentication",
                  description: "Your documents are protected with secure authentication, ensuring your privacy."
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-writer-primary"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>,
                  title: "Clean Interface",
                  description: "Our beautiful and intuitive design helps you stay focused on your writing."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-6 transition-all hover:shadow-md bg-background"
                >
                  <div className="p-2 bg-writer-secondary inline-block rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-writer-secondary/30">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Start Writing Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of writers who have already discovered the joy of distraction-free writing.
            </p>
            <Link to={user ? "/dashboard" : "/login?tab=signup"}>
              <Button size="lg" className="bg-writer-primary hover:bg-writer-primary/90">
                {user ? "Go to Dashboard" : "Get Started for Free"}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5 text-writer-primary" />
            <span className="font-semibold">Scribble</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Scribble. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
