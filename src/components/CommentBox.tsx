import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, User, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Comment } from '@/types'

interface CommentBoxProps {
  comment: Comment
  onLike?: (commentId: string) => void
  onReply?: (commentId: string, content: string) => void
}

export function CommentBox({ comment, onLike, onReply }: CommentBoxProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(comment.id)
  }

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply?.(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Vừa xong'
    if (diffInHours < 24) return `${diffInHours} giờ trước`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-gray-200 pb-6 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          {comment?.author?.avatar ? (
            <img
              src={comment?.author?.avatar ? comment?.author?.avatar : '/avatar.png'}
              alt={comment?.author?.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{comment?.author?.username}</span>
              <span className="text-sm text-gray-500">{formatTimeAgo(comment?.createdAt)}</span>
              {comment?.author?.role === 'teacher' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  Giáo viên
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" className="p-1">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-3">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {comment?.content}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>Thích ({comment?.likes + (isLiked ? 1 : 0)})</span>
            </motion.button>

            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Trả lời</span>
            </button>
          </div>

          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 pl-4 border-l-2 border-gray-200"
              >
                <div className="space-y-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Viết phản hồi của bạn..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleReply} disabled={!replyContent.trim()}>
                      Gửi phản hồi
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsReplying(false)
                        setReplyContent('')
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

