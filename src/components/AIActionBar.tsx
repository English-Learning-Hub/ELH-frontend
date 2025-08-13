import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wand2, CheckCircle, BookOpen, Brain, Loader2, X, Copy, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAI } from '@/hooks/useAI'
import { AIAction } from '@/types'

interface AIActionBarProps {
  content: string
  onContentUpdate?: (newContent: string) => void
}

interface AIResult {
  type: AIAction['type']
  title: string
  content: string
  suggestions?: string[]
  correctedText?: string
  exercises?: any[]
  vocabulary?: any[]
  error?: string
}

export function AIActionBar({ content, onContentUpdate }: AIActionBarProps) {
  const [activeAction, setActiveAction] = useState<AIAction['type'] | null>(null)
  const [result, setResult] = useState<AIResult | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const { checkGrammar, generateExercise, generateVocabulary, generateSummary } = useAI()

  const aiActions = {
    'grammar-check': {
      title: 'Kiểm tra ngữ pháp',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50 hover:bg-green-100 border-green-200',
      description: 'Phát hiện và sửa lỗi ngữ pháp trong văn bản'
    },
    'create-quiz': {
      title: 'Tạo bài tập',
      icon: Brain,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200',
      description: 'Tạo câu hỏi trắc nghiệm từ nội dung bài học'
    },
    'create-flashcards': {
      title: 'Tạo từ vựng',
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200',
      description: 'Tạo danh sách từ vựng quan trọng'
    },
    'create-summary': {
      title: 'Tóm tắt nội dung',
      icon: Wand2,
      color: 'text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200',
      description: 'Tạo tóm tắt ngắn gọn từ nội dung bài học'
    }
  }

  const handleAIAction = async (actionType: AIAction['type']) => {
    if (!content.trim()) {
      alert('Vui lòng nhập nội dung trước khi sử dụng AI')
      return
    }

    console.log(content);
    

    setActiveAction(actionType)
    setResult(null)

    try {
      let response
      let resultData: AIResult

      switch (actionType) {
        case 'grammar-check':
          response = await checkGrammar.mutateAsync(content)
          resultData = {
            type: actionType,
            title: 'Kết quả kiểm tra ngữ pháp',
            content: response.correctedText ? 'Đã phát hiện và sửa các lỗi ngữ pháp:' : 'Không tìm thấy lỗi ngữ pháp nào.',
            suggestions: response.corrections || [],
            correctedText: response.correctedText
          }
          break

        case 'create-quiz':
          response = await generateExercise.mutateAsync({ 
            content, 
            type: 'multiple-choice',
            level: 'intermediate',
          })
          resultData = {
            type: actionType,
            title: 'Bài tập được tạo',
            content: `Đã tạo ${response.exercises?.length || 0} câu hỏi từ nội dung bài học:`,
            exercises: response.exercises || []
          }
          break

        case 'create-flashcards':
          response = await generateVocabulary.mutateAsync()
          resultData = {
            type: actionType,
            title: 'Từ vựng được tạo',
            content: `Đã tạo ${response.vocabulary?.length || 0} từ vựng quan trọng:`,
            vocabulary: response.vocabulary || []
          }
          break

        case 'create-summary':
          response = await generateSummary.mutateAsync()
          resultData = {
            type: actionType,
            title: 'Tóm tắt nội dung',
            content: 'Tóm tắt ngắn gọn của bài học:',
            suggestions: [response.summary || 'Không thể tạo tóm tắt.']
          }
          break

        default:
          throw new Error('Hành động AI không được hỗ trợ')
      }

      setResult(resultData)
    } catch (error: any) {
      setResult({
        type: actionType,
        title: 'Lỗi xử lý AI',
        content: 'Đã xảy ra lỗi khi xử lý yêu cầu:',
        error: error.message || 'Lỗi không xác định'
      })
    } finally {
      setActiveAction(null)
    }
  }

  const closeResult = () => {
    setResult(null)
    setCopiedIndex(null)
  }

  const applyChanges = () => {
    if (result?.type === 'grammar-check' && result.correctedText && onContentUpdate) {
      onContentUpdate(result.correctedText)
    }
    closeResult()
  }

  const copyToClipboard = async (text: string, index?: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index ?? -1)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const isLoading = checkGrammar.isPending || generateExercise.isPending || 
                   generateVocabulary.isPending || generateSummary.isPending

  const getActionMutation = (actionType: AIAction['type']) => {
    switch (actionType) {
      case 'grammar-check': return checkGrammar
      case 'create-quiz': return generateExercise
      case 'create-flashcards': return generateVocabulary
      case 'create-summary': return generateSummary
      default: return null
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(aiActions).map(([key, action]) => {
          const mutation = getActionMutation(key as AIAction['type'])
          const isActionLoading = mutation?.isPending || (isLoading && activeAction === key)
          
          return (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleAIAction(key as AIAction['type'])}
              disabled={isLoading}
              className={`flex flex-col items-center gap-2 h-auto p-4 ${action.color} transition-all duration-200 hover:shadow-md`}
            >
              {isActionLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <action.icon className="w-6 h-6" />
              )}
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500 mt-1">{action.description}</div>
              </div>
            </Button>
          )
        })}
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Wand2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                    <p className="text-sm text-gray-600">Kết quả từ AI Assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeResult}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {result.error ? (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800">Đã xảy ra lỗi</p>
                      <p className="text-sm text-red-600">{result.error}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-6 text-lg">{result.content}</p>
                    
                    {result.type === 'grammar-check' && result.suggestions && result.suggestions.length > 0 && (
                      <div className="space-y-3">
                        {result.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 hover:bg-green-100 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(suggestion, index)}
                                className="ml-2 flex-shrink-0"
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'create-quiz' && result.exercises && (
                      <div className="space-y-4">
                        {result.exercises.map((exercise, index) => (
                          <div
                            key={index}
                            className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-medium text-blue-900">Câu {index + 1}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(JSON.stringify(exercise, null, 2), index)}
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <p className="text-gray-700 mb-2">{exercise.question}</p>
                            {exercise.options && (
                              <div className="space-y-1">
                                {exercise.options.map((option: string, optIndex: number) => (
                                  <div
                                    key={optIndex}
                                    className={`text-sm p-2 rounded ${
                                      optIndex === exercise.correctAnswer
                                        ? 'bg-green-100 text-green-800 font-medium'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optIndex)}. {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'create-flashcards' && result.vocabulary && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.vocabulary.map((vocab, index) => (
                          <div
                            key={index}
                            className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-purple-900">{vocab.word}</h4>
                                <p className="text-sm text-purple-700 mt-1">{vocab.definition}</p>
                                {vocab.example && (
                                  <p className="text-xs text-purple-600 mt-2 italic">"{vocab.example}"</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(`${vocab.word}: ${vocab.definition}`, index)}
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'create-summary' && result.suggestions && (
                      <div className="space-y-3">
                        {result.suggestions.map((summary, index) => (
                          <div
                            key={index}
                            className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-gray-700 flex-1">{summary}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(summary, index)}
                                className="ml-2 flex-shrink-0"
                              >
                                {copiedIndex === index ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                <div className="text-sm text-gray-500">
                  {result.error ? 'Vui lòng thử lại sau' : 'Kết quả được tạo bởi AI'}
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={closeResult}>
                    Đóng
                  </Button>
                  {result.type === 'grammar-check' && result.correctedText && !result.error && (
                    <Button onClick={applyChanges} className="bg-green-600 hover:bg-green-700">
                      Áp dụng thay đổi
                    </Button>
                  )}
                  {result.type !== 'grammar-check' && !result.error && (
                    <Button onClick={closeResult} className="bg-blue-600 hover:bg-blue-700">
                      Sử dụng kết quả
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

