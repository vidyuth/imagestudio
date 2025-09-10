import ImageUpload from '../ImageUpload';

export default function ImageUploadExample() {
  const handleFilesChange = (files: any[]) => {
    console.log('Files changed:', files);
  };

  return <ImageUpload onFilesChange={handleFilesChange} />;
}