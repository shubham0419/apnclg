declare interface Subtopic {
  _id: string;
  name: string;
  description?: string;
  topic: string; // topic id
  createdAt?: string;
  updatedAt?: string;
}

declare interface Topic {
  _id: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  subtopics?: Subtopic[];
  createdAt?: string;
  updatedAt?: string;
}

declare interface ProgressState {
    [topicId: string]: {
    completedSubtopics: string[]; // Array of subtopic IDs
    progress: number; // Percentage or count
  };
}