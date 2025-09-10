import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileCardProps {
  file: {
    file: File;
    preview: string;
  };
  index: number;
  onRemove: (index: number) => void;
}

export default function FileCard({ file, index, onRemove }: FileCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Card className="p-4" data-testid={`card-file-${index}`}>
      <div className="flex items-center space-x-3">
        {/* File Preview */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <img 
            src={file.preview} 
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            File {index + 1}
          </p>
          <p className="text-xs text-muted-foreground">
            {file.file.type.split('/')[1].toUpperCase()} | {formatFileSize(file.file.size)}
          </p>
        </div>
        
        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(index)}
          className="w-8 h-8 flex-shrink-0"
          data-testid={`button-remove-${index}`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}