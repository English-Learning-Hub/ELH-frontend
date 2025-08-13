interface Position {
    start: number;
    end: number;
  }
  
  interface Correction {
    original: string;
    corrected: string;
    explanation: string;
    position: Position;
  }
  
  export interface GrammarCheckResponse {
    originalText: string;
    correctedText: string;
    corrections: Correction[];
    suggestions: string[];
  }
  
  
  type ExerciseType = 'quiz' | 'fill-in-the-blank' | 'matching';
  type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
  
  interface ExerciseQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }
  
  export interface ExerciseResponse {
    type: ExerciseType;
    level: DifficultyLevel;
    title: string;
    instructions: string;
    questions: ExerciseQuestion[];
    sourceContent: string;
  }
  
  interface VocabularyWord {
    word: string;
    definition: string;
    example: string;
    level: DifficultyLevel;
  }
  
  export interface VocabularyResponse {
    words: VocabularyWord[];
    sourceText: string;
  }

export interface SummaryResponse {
    summary: string;
    keyPoints: string[];
    originalLength: number;
    summaryLength: number;
  }

export interface GeminiErrorResponse {
    error: string;
    raw?: string;
    details?: string;
  }