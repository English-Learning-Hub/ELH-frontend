import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LessonCard } from '@/components/LessonCard'
import { Lesson, LessonFilters } from '@/types'
import { useLessons } from '@/hooks/useLessons'
import { LoadingWrapper } from '@/components/LoadingWrapper'

export function LessonsPage() {
  const {getAllLessons } = useLessons();
  const lessons = getAllLessons();
  const [filters, setFilters] = useState<LessonFilters>({
    search: '',
    type: undefined,
    level: undefined,
    sortBy: 'newest'
  })


  

  const filteredLessons = lessons?.data?.lessons?.filter((lesson: Lesson) => {
    if (filters.search && !lesson.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !lesson.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.type && lesson.type !== filters.type) {
      return false
    }
    if (filters.level && lesson.level !== filters.level) {
      return false
    }
    return true
  }).sort((a: Lesson, b: Lesson) => {
    switch (filters.sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'popular':
        return b.likes - a.likes
      case 'likes':
        return b.likes - a.likes
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <LoadingWrapper variant='inline' color='primary'  loading={lessons?.isLoading}>
      <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Bài học</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm bài học..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loại bài học
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              type: e.target.value === 'all' ? undefined : e.target.value as any
            }))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="grammar">Ngữ pháp</option>
            <option value="vocabulary">Từ vựng</option>
            <option value="listening">Nghe</option>
            <option value="speaking">Nói</option>
            <option value="reading">Đọc</option>
            <option value="writing">Viết</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trình độ
          </label>
          <select
            value={filters.level || 'all'}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              level: e.target.value === 'all' ? undefined : e.target.value as any
            }))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả</option>
            <option value="beginner">Cơ bản</option>
            <option value="intermediate">Trung cấp</option>
            <option value="advanced">Nâng cao</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sắp xếp theo
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              sortBy: e.target.value as any
            }))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="popular">Phổ biến</option>
            <option value="likes">Nhiều like</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Tìm thấy {filteredLessons?.length} bài học
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons?.map((lesson: Lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>

      {filteredLessons?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">Không tìm thấy bài học nào</div>
          <p className="text-gray-400">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}
    </div>
    </LoadingWrapper>
  )
}

