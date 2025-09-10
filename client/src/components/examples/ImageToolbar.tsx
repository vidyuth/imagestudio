import ImageToolbar from '../ImageToolbar';

export default function ImageToolbarExample() {
  const handleDownload = () => console.log('Download clicked');
  const handleShare = () => console.log('Share clicked');
  const handleReset = () => console.log('Reset clicked');
  const handleUndo = () => console.log('Undo clicked');
  const handleRedo = () => console.log('Redo clicked');

  return (
    <ImageToolbar 
      onDownload={handleDownload}
      onShare={handleShare}
      onReset={handleReset}
      onUndo={handleUndo}
      onRedo={handleRedo}
    />
  );
}