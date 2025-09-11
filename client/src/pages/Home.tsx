import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import FileCard from "@/components/FileCard";
import RoomPresets from "@/components/RoomPresets";
import PromptComposer from "@/components/PromptComposer";
import EditScreen from "@/pages/EditScreen";

interface UploadedFile {
  file: File;
  preview: string;
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<'upload' | 'edit'>('upload');
  const [prompt, setPrompt] = useState<string>('');

  const handleFilesChange = (files: UploadedFile[]) => {
    setUploadedFiles(files);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleStageIt = (promptText: string) => {
    setPrompt(promptText);
    setCurrentScreen('edit');
  };

  const handleBackToUpload = () => {
    setCurrentScreen('upload');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 relative overflow-hidden">
        <div className="h-full">
          <AnimatePresence mode="wait">
            {currentScreen === 'upload' && (
              <motion.div
                key="upload"
                initial={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                  {/* Upload Section */}
                  <div data-testid="upload-section">
                    <ImageUpload onFilesChange={handleFilesChange} />
                  </div>
                  
                  {/* File Cards */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-4" data-testid="file-cards-section">
                      {uploadedFiles.map((file, index) => (
                        <FileCard
                          key={index}
                          file={file}
                          index={index}
                          onRemove={handleRemoveFile}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Room Presets */}
                  <div data-testid="room-presets-section">
                    <RoomPresets onRoomSelect={handleRoomSelect} />
                  </div>
                  
                  {/* Prompt Composer */}
                  <div data-testid="prompt-composer-section">
                    <PromptComposer 
                      onStageIt={handleStageIt}
                      disabled={uploadedFiles.length === 0}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            {currentScreen === 'edit' && (
              <motion.div
                key="edit"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <EditScreen 
                  onBack={handleBackToUpload}
                  prompt={prompt}
                  beforeImage={uploadedFiles[0]?.preview || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3NDhBIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk9yaWdpbmFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4='}
                  afterImage='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkJFQ0IzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTI0MDBEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkVkaXRlZCBJbWFnZTwvdGV4dD4KPC9zdmc+'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}