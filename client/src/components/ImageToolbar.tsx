import { Button } from "@/components/ui/button";
import { Download, Share, RotateCcw, Undo2, Redo2 } from "lucide-react";

interface ImageToolbarProps {
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function ImageToolbar({ 
  onDownload, 
  onShare, 
  onReset, 
  onUndo, 
  onRedo 
}: ImageToolbarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-card-border rounded-lg">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          data-testid="button-undo"
        >
          <Undo2 className="w-4 h-4 mr-2" />
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRedo}
          data-testid="button-redo"
        >
          <Redo2 className="w-4 h-4 mr-2" />
          Redo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          data-testid="button-reset"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          data-testid="button-share"
        >
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          size="sm"
          onClick={onDownload}
          data-testid="button-download"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}