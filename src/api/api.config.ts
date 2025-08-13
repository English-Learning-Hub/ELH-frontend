import {
  AIData,
  Comment,
  CreateLessonFormData,
  Lesson,
  LoginFormData,
  RegisterFormData,
} from "@/types";
import agent from "./agent";

// Auth API
export const authAPI = {
  register: (data: RegisterFormData) => agent.post("/auth/register", data),
  login: (data: LoginFormData) => agent.post("/auth/login", data),
  getProfile: () => agent.get("/auth/profile"),
  logout: () => agent.post("/auth/logout"),
};

// Lessons API
export const lessonsAPI = {
  getAll: (page = 1, limit = 12) =>
    agent.get(`/lessons?page=${page}&limit=${limit}`),
  getById: (id: number) => agent.get(`/lessons/${id}`),
  create: (data: CreateLessonFormData) => agent.post("/lessons", data),
  update: (id: number, data: Lesson) => agent.patch(`/lessons/${id}`, data),
  delete: (id: number) => agent.delete(`/lessons/${id}`),
  like: (id: number) => agent.post(`/lessons/${id}/like`),
  search: (query: string) =>
    agent.get(`/lessons/search?q=${encodeURIComponent(query)}`),
  getMyLessons: () => agent.get("/lessons/my-lessons"),
};

// Comments API
export const commentsAPI = {
  getByLesson: (lessonId: number) => agent.get(`/comments/lesson/${lessonId}`),
  create: (lessonId: number, data: { content: string }) =>
    agent.post(`/comments/lesson/${lessonId}`, data),
  update: (id: number, data: Comment) => agent.patch(`/comments/${id}`, data),
  delete: (id: number) => agent.delete(`/comments/${id}`),
  like: (id: number) => agent.post(`/comments/${id}/like`),
};

// AI API
export const aiAPI = {
  checkGrammar: (text: string) => agent.post("/ai/grammar-check", {
    text: text
  }),
  generateExercise: (data: AIData) => agent.post("/ai/generate-exercise", data),
  generateVocabulary: () =>
    agent.post("/ai/generate-vocabulary"),
  generateSummary: () => agent.post("/ai/generate-summary"),
};

