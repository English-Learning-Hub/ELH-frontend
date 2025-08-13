import { useState } from 'react';
import { Save, Eye, Sparkles, BookOpen, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Editor } from '@/components/Editor';
import { AIActionBar } from '@/components/AIActionBar';
import { CreateLessonFormData } from '@/types';
import { useLessons } from '@/hooks/useLessons';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';

export function CreateLessonPage() {
  const [isPreview, setIsPreview] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const { createLesson } = useLessons();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateLessonFormData>({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      type: 'grammar',
      level: 'beginner',
      tags: [],
    },
  });

  const [tagsInput, setTagsInput] = useState('');

  const onSubmit = (data: CreateLessonFormData) => {
    const lessonData = {
      ...data,
      tags: tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    createLesson.mutate(lessonData);
  };

  const formData = watch();

  const handleContentUpdate = (newContent: string) => {
    setValue('content', newContent);
  };

  const typeLabels = {
    grammar: 'Ngữ pháp',
    vocabulary: 'Từ vựng',
    listening: 'Nghe',
    speaking: 'Nói',
    reading: 'Đọc',
    writing: 'Viết',
  };

  const levelLabels = {
    beginner: 'Cơ bản',
    intermediate: 'Trung cấp',
    advanced: 'Nâng cao',
  };

  const typeIcons = {
    grammar: '📝',
    vocabulary: '📚',
    listening: '🎧',
    speaking: '🗣️',
    reading: '📖',
    writing: '✍️',
  };

  const levelColors = {
    beginner: 'bg-green-100 text-green-800 border-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    advanced: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <LoadingWrapper
      loading={createLesson.isPending}
      loadingText="Đang tạo bài học..."
      variant="inline"
      color="primary"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Tạo bài học mới
            </h1>
            <p className="text-gray-600 mt-2">Tạo nội dung học tập chất lượng cao với sự hỗ trợ của AI</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {showAIPanel ? 'Ẩn AI' : 'Hiện AI'}
            </Button>
            <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
              <Eye className="w-4 h-4 mr-2" />
              {isPreview ? 'Chỉnh sửa' : 'Xem trước'}
            </Button>
            <Button form="lesson-form" type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu bài học
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Học viên tiềm năng</p>
                <p className="text-2xl font-bold text-blue-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Tỷ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-green-900">87%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Điểm AI trung bình</p>
                <p className="text-2xl font-bold text-purple-900">9.2/10</p>
              </div>
            </div>
          </div>
        </motion.div>

         {showAIPanel && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-12"
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden sticky top-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-semibold">AI Assistant</h3>
                      <p className="text-purple-100 text-sm">Công cụ hỗ trợ tạo nội dung thông minh</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <AIActionBar
                    content={formData.content}
                    onContentUpdate={handleContentUpdate}
                  />
                </div>
              </div>
            </motion.div>
          )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 transition-all duration-300"
          >
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <h2 className="text-xl font-semibold">Thông tin bài học</h2>
                <p className="text-blue-100 mt-1">Điền thông tin cơ bản cho bài học của bạn</p>
              </div>
              
              <form
                id="lesson-form"
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 space-y-6"
              >
                {/* Title and Tags */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề bài học *
                    </label>
                    <input
                      type="text"
                      {...register('title', { required: 'Tiêu đề là bắt buộc' })}
                      className={`w-full px-4 py-3 border ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      placeholder="Nhập tiêu đề bài học"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="grammar, present simple, basic"
                    />
                    {tagsInput && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagsInput.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại bài học *
                    </label>
                    <select
                      {...register('type', { required: 'Loại bài học là bắt buộc' })}
                      className={`w-full px-4 py-3 border ${
                        errors.type ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    >
                      {Object.entries(typeLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {typeIcons[value as keyof typeof typeIcons]} {label}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trình độ *
                    </label>
                    <select
                      {...register('level', { required: 'Trình độ là bắt buộc' })}
                      className={`w-full px-4 py-3 border ${
                        errors.level ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    >
                      {Object.entries(levelLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    {errors.level && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.level.message}
                      </p>
                    )}
                    {formData.level && (
                      <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                          levelColors[formData.level as keyof typeof levelColors]
                        }`}>
                          {levelLabels[formData.level as keyof typeof levelLabels]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả ngắn *
                  </label>
                  <textarea
                    {...register('description', {
                      required: 'Mô tả là bắt buộc',
                    })}
                    className={`w-full px-4 py-3 border ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    rows={3}
                    placeholder="Mô tả ngắn gọn về nội dung bài học"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung bài học *
                  </label>
                  {isPreview ? (
                    <div className="border border-gray-300 rounded-lg p-6 min-h-[400px] bg-gray-50">
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {formData.title || 'Tiêu đề bài học'}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                            {typeIcons[formData.type as keyof typeof typeIcons]} {typeLabels[formData.type as keyof typeof typeLabels]}
                          </span>
                          <span className={`px-3 py-1 text-sm rounded-full font-medium border ${
                            levelColors[formData.level as keyof typeof levelColors]
                          }`}>
                            {levelLabels[formData.level as keyof typeof levelLabels]}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {formData.description || 'Mô tả bài học'}
                        </p>
                      </div>
                      <div className="prose max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formData.content
                              .replace(/\n/g, '<br>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                              .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
                              .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
                              .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>'),
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Controller
                      name="content"
                      control={control}
                      rules={{ required: 'Nội dung bài học là bắt buộc' }}
                      render={({ field }) => (
                        <Editor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Viết nội dung bài học của bạn ở đây. Bạn có thể sử dụng Markdown để định dạng văn bản."
                          minHeight={400}
                        />
                      )}
                    />
                  )}
                  {errors.content && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Lưu nháp
                  </Button>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isPreview ? 'Chỉnh sửa' : 'Xem trước'}
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Xuất bản bài học
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>

         
        </div>
      </div>
    </LoadingWrapper>
  );
}

