import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LABELS } from "@/config/labels";

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
      console.log(LABELS.IMAGE_UPLOAD.MAX_FILES_MESSAGE);
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
        className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 lg:p-12 text-center transition-colors ${
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
        
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center">
            <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </div>
          
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-base sm:text-lg font-medium text-foreground">
              {LABELS.IMAGE_UPLOAD.TITLE}
            </h3>
            <p className="text-sm text-muted-foreground px-2">
              {LABELS.IMAGE_UPLOAD.DESCRIPTION}
            </p>
          </div>
          
          <Button 
            onClick={openFilePicker}
            variant="outline"
            className="mt-3 sm:mt-4"
            data-testid="button-browse"
          >
            {LABELS.ACTIONS.BROWSE_FILES}
          </Button>
        </div>
      </div>
    </div>
  );
}