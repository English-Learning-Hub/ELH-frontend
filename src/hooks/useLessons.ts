import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lessonsAPI } from "../api/api.config";
import { CreateLessonFormData, Lesson } from "@/types";
import { enqueueSnackbar } from "notistack";

export const useLessons = () => {
  const queryClient = useQueryClient();

  const getAllLessons = (page = 1, limit = 12) =>
    useQuery({
      queryKey: ["lessons", page, limit],
      queryFn: async () => {
        const response = await lessonsAPI.getAll(page, limit);
        return response.data;
      },
    });

  const getLessonById = (id: number) =>
    useQuery({
      queryKey: ["lesson", id],
      queryFn: async () => {
        const response = await lessonsAPI.getById(id);
        return response.data;
      },
      enabled: !!id,
    });

  const searchLessons = (query: string) =>
    useQuery({
      queryKey: ["lessons", "search", query],
      queryFn: async () => {
        const response = await lessonsAPI.search(query);
        return response.data;
      },
      enabled: !!query,
    });

  const getMyLessons = () =>
    useQuery({
      queryKey: ["my-lessons"],
      queryFn: async () => {
        const response = await lessonsAPI.getMyLessons();
        return response.data;
      },
    });

  const createLesson = useMutation({
    mutationFn: async (data: CreateLessonFormData) => {
      const response = await lessonsAPI.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
      enqueueSnackbar("Bài học đã được tạo thành công!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Lỗi khi tạo bài học!", { variant: "error" });
    },
  });

  const updateLesson = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Lesson }) => {
      const response = await lessonsAPI.update(id, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
    },
  });

  const deleteLesson = useMutation({
    mutationFn: async (id: number) => {
      const response = await lessonsAPI.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["my-lessons"] });
    },
  });

  const likeLesson = useMutation({
    mutationFn: async (id: number) => {
      const response = await lessonsAPI.like(id);
      return response.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
    },
  });

  return {
    getAllLessons,
    getLessonById,
    searchLessons,
    getMyLessons,
    createLesson,
    updateLesson,
    deleteLesson,
    likeLesson,
  };
};
