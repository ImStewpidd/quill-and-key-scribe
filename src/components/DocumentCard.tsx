
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Document } from "@/lib/mockData";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteDocument } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";

interface DocumentCardProps {
  document: Document;
  onDelete: () => void;
}

const DocumentCard = ({ document, onDelete }: DocumentCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    try {
      deleteDocument(document.id);
      toast({
        title: "Document deleted",
        description: `"${document.title}" has been deleted.`
      });
      onDelete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold truncate">{document.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div 
          className="text-sm text-muted-foreground h-20 overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ 
            __html: document.content.length > 150 
              ? document.content.substring(0, 150) + '...' 
              : document.content 
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t bg-muted/50">
        <span className="text-xs text-muted-foreground">
          Updated {formatDate(document.updatedAt)}
        </span>
        <div className="flex gap-2">
          <Link to={`/editor/${document.id}`}>
            <Button size="sm" variant="ghost">
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="ghost" className="text-destructive">
                <Trash className="h-4 w-4 mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your document
                  "{document.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete} 
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
