
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getUserDocuments, Document, createDocument } from "@/lib/mockData";
import DocumentCard from "@/components/DocumentCard";
import Navbar from "@/components/Navbar";
import { FileText, Plus } from "lucide-react";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // If not logged in and auth is not loading, redirect to login
    if (!user && !authLoading) {
      navigate('/login');
      return;
    }

    // If logged in, fetch documents
    if (user) {
      try {
        const userDocs = getUserDocuments(user.id);
        setDocuments(userDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, authLoading, navigate]);

  const handleCreateDocument = () => {
    if (!user) return;
    
    try {
      const newDoc = createDocument(user.id);
      navigate(`/editor/${newDoc.id}`);
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  const handleDocumentDeleted = () => {
    // Refetch documents after one is deleted
    if (user) {
      setDocuments(getUserDocuments(user.id));
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-t-2 border-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">My Documents</h1>
            <p className="text-muted-foreground">
              {documents.length === 0 
                ? "Create your first document to get started"
                : `You have ${documents.length} document${documents.length === 1 ? '' : 's'}`}
            </p>
          </div>
          
          <Button onClick={handleCreateDocument}>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
        
        {documents.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first document to start writing
            </p>
            <Button onClick={handleCreateDocument}>
              <Plus className="mr-2 h-4 w-4" />
              Create Document
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                onDelete={handleDocumentDeleted} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
