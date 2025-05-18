
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Bold, Italic, Underline, List, ListOrdered, Heading1, Heading2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EditorToolbarProps {
  onFormat: (format: string) => void;
  documentTitle: string;
  onTitleChange: (title: string) => void;
  isSaving: boolean;
}

const EditorToolbar = ({ onFormat, documentTitle, onTitleChange, isSaving }: EditorToolbarProps) => {
  const formatButtons = [
    { icon: <Bold size={16} />, format: 'bold', tooltip: 'Bold' },
    { icon: <Italic size={16} />, format: 'italic', tooltip: 'Italic' },
    { icon: <Underline size={16} />, format: 'underline', tooltip: 'Underline' },
    { icon: <Heading1 size={16} />, format: 'h1', tooltip: 'Heading 1' },
    { icon: <Heading2 size={16} />, format: 'h2', tooltip: 'Heading 2' },
    { icon: <List size={16} />, format: 'ul', tooltip: 'Bullet List' },
    { icon: <ListOrdered size={16} />, format: 'ol', tooltip: 'Numbered List' },
  ];

  return (
    <div className="border-b px-4 py-2 flex items-center justify-between sticky top-0 bg-background z-10">
      <div className="flex items-center gap-2">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={18} />
          </Button>
        </Link>

        <input
          type="text"
          value={documentTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-transparent border-none focus:outline-none font-medium text-lg placeholder-muted-foreground"
          placeholder="Untitled Document"
        />

        <span className="text-xs text-muted-foreground ml-2">
          {isSaving ? 'Saving...' : 'Saved'}
        </span>
      </div>

      <div className="flex space-x-1">
        <TooltipProvider>
          {formatButtons.map((button) => (
            <Tooltip key={button.format}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFormat(button.format)}
                  className="h-8 w-8 p-0"
                >
                  {button.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{button.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EditorToolbar;
