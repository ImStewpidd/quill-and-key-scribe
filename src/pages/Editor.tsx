
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getDocument, updateDocument } from "@/lib/mockData";
import EditorToolbar from "@/components/EditorToolbar";
import { useToast } from "@/components/ui/use-toast";

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [documentContent, setDocumentContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const saveTimeoutRef = useRef<number | undefined>(undefined);
  
  // Check auth and load document
  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/login');
      return;
    }
    
    if (user && id) {
      try {
        const doc = getDocument(id);
        
        if (!doc || doc.userId !== user.id) {
          toast({
            title: "Document not found",
            description: "The document you're trying to access doesn't exist or you don't have permission to view it.",
            variant: "destructive"
          });
          navigate('/dashboard');
          return;
        }
        
        setDocumentTitle(doc.title);
        setDocumentContent(doc.content);
        
        if (contentEditableRef.current) {
          contentEditableRef.current.innerHTML = doc.content;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load document.",
          variant: "destructive"
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    }
  }, [user, authLoading, id, navigate, toast]);
  
  // Auto-save document changes
  useEffect(() => {
    if (!isLoading && user && id) {
      const saveChanges = () => {
        setIsSaving(true);
        
        try {
          if (contentEditableRef.current) {
            const content = contentEditableRef.current.innerHTML;
            updateDocument(id, { 
              title: documentTitle, 
              content 
            });
            setDocumentContent(content);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to save document.",
            variant: "destructive"
          });
        } finally {
          setIsSaving(false);
        }
      };
      
      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      // Set new timeout for auto-saving
      saveTimeoutRef.current = setTimeout(saveChanges, 1000) as unknown as number;
      
      return () => {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
      };
    }
  }, [documentTitle, id, isLoading, toast, user]);
  
  // Format functions for toolbar actions
  const handleFormat = (format: string) => {
    document.execCommand('styleWithCSS', false, 'true');
    
    switch (format) {
      case 'bold':
      case 'italic':
      case 'underline':
        document.execCommand(format, false);
        break;
      case 'h1':
        document.execCommand('formatBlock', false, '<h1>');
        break;
      case 'h2':
        document.execCommand('formatBlock', false, '<h2>');
        break;
      case 'ul':
        document.execCommand('insertUnorderedList', false);
        break;
      case 'ol':
        document.execCommand('insertOrderedList', false);
        break;
      default:
        break;
    }
    
    // Focus back on editor
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  };
  
  // Handle title change
  const handleTitleChange = (title: string) => {
    setDocumentTitle(title);
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-6 h-6 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <EditorToolbar 
        onFormat={handleFormat} 
        documentTitle={documentTitle} 
        onTitleChange={handleTitleChange}
        isSaving={isSaving}
      />
      
      <div className="container py-8 flex-1">
        <div 
          ref={contentEditableRef}
          className="editor-content min-h-[500px] p-4"
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default Editor;
