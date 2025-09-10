import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  file: File;
  preview: string;
}

interface ImageUploadProps {
  onFilesChange: (files: UploadedFile[]) => void;
}

export default function ImageUpload({ onFilesChange }: ImageUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => 
      file.type.match(/^image\/(png|jpe?g|webp)$/i)
    );
    
    if (validFiles.length + uploadedFiles.length > 2) {
      console.log('Maximum 2 images allowed');
      return;
    }

    const newFiles = validFiles.slice(0, 2 - uploadedFiles.length).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragOver 
            ? 'border-primary bg-accent/50' 
            : 'border-border hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-testid="upload-area"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          data-testid="input-file"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">
              Browse images to upload
            </h3>
            <p className="text-sm text-muted-foreground">
              PNG, JPG, WEBP • Max 2 images
            </p>
          </div>
          
          <Button 
            onClick={openFilePicker}
            variant="outline"
            data-testid="button-browse"
          >
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
}