import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const roomTypes = [
  { id: 'living-room', label: 'Living Room' },
  { id: 'dining-room', label: 'Dining Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'kitchen', label: 'Kitchen' },
];

interface RoomPresetsProps {
  onRoomSelect: (roomId: string) => void;
}

export default function RoomPresets({ onRoomSelect }: RoomPresetsProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    onRoomSelect(roomId);
    console.log(`Selected room: ${roomId}`);
  };

  return (
    <div className="w-full" data-testid="room-presets">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="preset" className="border-border">
          <AccordionTrigger 
            className="hover:no-underline hover:text-foreground"
            data-testid="accordion-trigger-preset"
          >
            Preset
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              {roomTypes.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRoomSelect(room.id)}
                  className="justify-start"
                  data-testid={`button-room-${room.id}`}
                >
                  {room.label}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}