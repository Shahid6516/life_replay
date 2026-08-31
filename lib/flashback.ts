export interface MemoryWithMedia {
  id: string;
  title: string;
  description?: string | null;
  eventDate: Date;
  location?: string | null;
  mood: string;
  tags: string[];
  aiReflection?: string | null;
  media: { id: string; url: string }[];
}

export function findOnThisDayMemories(memories: MemoryWithMedia[]): MemoryWithMedia[] {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const currentYear = today.getFullYear();

  return memories.filter((mem) => {
    const memDate = new Date(mem.eventDate);

    const isSameDate =
      memDate.getMonth() === currentMonth &&
      memDate.getDate() === currentDay;
    
    return isSameDate && memDate.getFullYear() <= currentYear;
  });
}