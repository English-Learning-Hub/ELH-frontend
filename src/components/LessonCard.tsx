import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, User, Clock, BookOpen } from 'lucide-react'
import { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
}

const typeColors = {
  grammar: 'bg-blue-100 text-blue-800',
  vocabulary: 'bg-green-100 text-green-800',
  listening: 'bg-purple-100 text-purple-800',
  speaking: 'bg-orange-100 text-orange-800',
  reading: 'bg-red-100 text-red-800',
  writing: 'bg-yellow-100 text-yellow-800'
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
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

export function LessonCard({ lesson }: LessonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/lessons/${lesson.id}`} className="block p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded ${typeColors[lesson.type]}`}>
              {typeLabels[lesson.type]}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded ${levelColors[lesson.level]}`}>
              {levelLabels[lesson.level]}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Heart className="w-4 h-4" />
            <span>{lesson.likes}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {lesson.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lesson.description}
        </p>

        {lesson.tags && lesson?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {lesson?.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
            {lesson?.tags?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{lesson?.tags?.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{lesson.author.username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(lesson.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lesson?.comments?.length} bình luận</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

