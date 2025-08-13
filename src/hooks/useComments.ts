import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsAPI } from "../api/api.config";
import { Comment } from "@/types";
import { enqueueSnackbar } from "notistack";

export const useComments = (lessonId: number) => {
  const queryClient = useQueryClient();

  const getCommentsByLesson = useQuery({
    queryKey: ["comments", lessonId],
    queryFn: async () => {
      const response = await commentsAPI.getByLesson(lessonId);
      return response.data;
    },
    enabled: !!lessonId,
  });

  const createComment = useMutation({
    mutationFn: async (data: { content: string }) => {
      const response = await commentsAPI.create(lessonId, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lessonId] });
      enqueueSnackbar("Bình luận đã được tạo thành công!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Lỗi khi tạo bình luận!", { variant: "error" });
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Comment }) => {
      const response = await commentsAPI.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lessonId] });
      enqueueSnackbar("Bình luận đã được cập nhật thành công!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Lỗi khi cập nhật bình luận!", { variant: "error" });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (id: number) => {
      const response = await commentsAPI.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lessonId] });
      enqueueSnackbar("Bình luận đã được xóa thành công!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Lỗi khi xóa bình luận!", { variant: "error" });
    },
  });

  const likeComment = useMutation({
    mutationFn: async (id: number) => {
      const response = await commentsAPI.like(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lessonId] });
      enqueueSnackbar("Bình luận đã được thích thành công!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Lỗi khi thích bình luận!", { variant: "error" });
    },
  });

  return {
    getCommentsByLesson,
    createComment,
    updateComment,
    deleteComment,
    likeComment,
  };
};
