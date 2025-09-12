import { useState } from "react";
import EditScreenMobile from "./EditScreen.mobile";
import TestDesktopEditScreen from "./TestDesktopEditScreen";
import { useIsMobile } from "../hooks/use-mobile";

interface EditScreenProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreen({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenProps) {
  const isMobile = useIsMobile();

  // Use mobile version on mobile devices
  if (isMobile) {
    return (
      <EditScreenMobile 
        onBack={onBack}
        prompt={prompt}
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    );
  }

  // Use the new desktop design
  return (
    <TestDesktopEditScreen />
  );
}
