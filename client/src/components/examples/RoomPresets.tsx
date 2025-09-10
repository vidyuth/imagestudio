import RoomPresets from '../RoomPresets';

export default function RoomPresetsExample() {
  const handleRoomSelect = (roomId: string) => {
    console.log('Room selected:', roomId);
  };

  return <RoomPresets onRoomSelect={handleRoomSelect} />;
}