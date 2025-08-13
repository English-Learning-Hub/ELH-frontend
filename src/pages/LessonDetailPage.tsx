import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, Bookmark, MessageCircle, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CommentBox } from '@/components/CommentBox'

const typeLabels = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  listening: 'Listening',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
}

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export type LessonType = keyof typeof typeLabels;
export type LessonLevel = keyof typeof levelLabels;
import { useLessons } from '@/hooks/useLessons'
import { Comment } from '@/types'
import { useComments } from '@/hooks/useComments'

export function LessonDetailPage() {
  const { id } = useParams()
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const {getLessonById } = useLessons();
  const lesson = getLessonById(Number(id));
  const {getCommentsByLesson: comments, createComment} = useComments(Number(id));
  

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Bài học không tồn tại</h1>
        <p className="text-gray-600">Bài học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      </div>
    )
  }

  const typeLabels = {
    grammar: 'Ngữ pháp',
    vocabulary: 'Từ vựng',
    listening: 'Nghe',
    speaking: 'Nói',
    reading: 'Đọc',
    writing: 'Viết'
  }

  const levelLabels = {
    beginner: 'Cơ bản',
    intermediate: 'Trung cấp',
    advanced: 'Nâng cao'
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      createComment.mutate({ content: newComment })
      setNewComment('')
    }
  }

  const handleCommentLike = (commentId: string) => {
    console.log('Like comment:', commentId)
  }

  const handleCommentReply = (commentId: string, content: string) => {
    console.log('Reply to comment:', commentId, content)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
              {typeLabels[lesson.data?.type as LessonType]}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
              {levelLabels[lesson.data?.level as LessonLevel]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLike}
              className={isLiked ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {lesson.data?.likes + (isLiked ? 1 : 0)}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? 'text-blue-500 border-blue-500' : ''}
            >
              <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Đã lưu' : 'Lưu'}
            </Button>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {lesson?.data?.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Tác giả: {lesson?.data?.author.name}</span>
            {lesson?.data?.author.role === 'teacher' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                Giáo viên
              </span>
            )}
          </div>
          <span>•</span>
          <span>Ngày tạo: {new Date(lesson?.data?.createdAt).toLocaleDateString('vi-VN')}</span>
          <span>•</span>
          <span>Cập nhật: {new Date(lesson?.data?.updatedAt).toLocaleDateString('vi-VN')}</span>
        </div>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          {lesson?.data?.description}
        </p>

        {lesson?.data?.tags && lesson?.data?.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lesson?.data?.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nội dung bài học</h2>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ 
            __html: lesson?.data?.content
              .replace(/\n/g, '<br>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^# (.*$)/gm, '<h1>$1</h1>')
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^### (.*$)/gm, '<h3>$1</h3>')
              .replace(/^- (.*$)/gm, '<li>$1</li>')
          }} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Bình luận ({lesson?.data?.comments.length})
          </h2>
        </div>
        
        <div className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button 
              size="sm" 
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Gửi bình luận
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {comments?.data?.map((comment: Comment) => (
            <CommentBox
              key={comment.id}
              comment={comment}
              onLike={handleCommentLike}
              onReply={handleCommentReply}
            />
          ))}
        </div>

        {comments?.data?.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Chưa có bình luận nào</div>
            <p className="text-gray-400">Hãy là người đầu tiên bình luận về bài học này!</p>
          </div>
        )}
      </div>
    </div>
  )
}

