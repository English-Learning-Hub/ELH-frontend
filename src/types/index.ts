export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: 'student' | 'teacher'
  createdAt: string
}

export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  type: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading' | 'writing'
  level: 'beginner' | 'intermediate' | 'advanced'
  author: User
  likes: number
  bookmarks: number
  comments: Comment[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  author: User
  lessonId: string
  createdAt: string
  likes: number
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  role: 'student' | 'teacher'
}

export interface CreateLessonFormData {
  title: string
  description: string
  content: string
  type: Lesson['type']
  level: Lesson['level']
  tags: string[]
}

export interface LessonFilters {
  search?: string
  type?: Lesson['type']
  level?: Lesson['level']
  sortBy?: 'newest' | 'oldest' | 'popular' | 'likes'
}

export interface AIAction {
  type: 'grammar-check' | 'create-quiz' | 'create-flashcards' | 'create-summary'
  input: string
  result?: any
  loading: boolean
}

export interface AIData {
  content: string,
  type: "quiz" | "flashcards" | "summary" | "grammar-check" | "multiple-choice",
  level: "beginner" | "intermediate" | "advanced"
}
