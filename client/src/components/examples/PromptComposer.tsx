import PromptComposer from '../PromptComposer';

export default function PromptComposerExample() {
  const handleStageIt = (prompt: string) => {
    console.log('Stage It with prompt:', prompt);
  };

  return <PromptComposer onStageIt={handleStageIt} />;
}