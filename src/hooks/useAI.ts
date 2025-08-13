import { useMutation } from "@tanstack/react-query";
import { aiAPI } from "../api/api.config";
import { AIData } from "@/types";

export const useAI = () => {
  const checkGrammar = useMutation({
    mutationFn: async (text: string) => {
      const response = await aiAPI.checkGrammar(text);
      return response.data;
    },
  });

  const generateExercise = useMutation({
    mutationFn: async (data: AIData) => {
      const response = await aiAPI.generateExercise(data);
      return response.data;
    },
  });

  const generateVocabulary = useMutation({
    mutationFn: async () => {
      const response = await aiAPI.generateVocabulary();
      return response.data;
    },
  });

  const generateSummary = useMutation({
    mutationFn: async () => {
      const response = await aiAPI.generateSummary();
      return response.data;
    },
  });

  return {
    checkGrammar,
    generateExercise,
    generateVocabulary,
    generateSummary,
  };
};
