import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LABELS } from "@/config/labels";

interface PromptComposerProps {
  onStageIt: (prompt: string) => void;
  disabled?: boolean;
}

export default function PromptComposer({ onStageIt, disabled = false }: PromptComposerProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (prompt.trim()) {
      onStageIt(prompt);
    }
  };

  return (
    <div className="w-full space-y-4" data-testid="prompt-composer">
      <div className="space-y-2">
        <Label htmlFor="prompt" className="text-sm font-medium text-foreground">
          {LABELS.PROMPT_COMPOSER.LABEL}
        </Label>
        <Textarea
          id="prompt"
          placeholder={LABELS.PROMPT_COMPOSER.PLACEHOLDER}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
          disabled={disabled}
          data-testid="textarea-prompt"
        />
      </div>
      
      <Button 
        onClick={handleSubmit}
        disabled={disabled || !prompt.trim()}
        className="w-full"
        data-testid="button-stage-it"
      >
        {LABELS.ACTIONS.STAGE_IT}
      </Button>
    </div>
  );
}