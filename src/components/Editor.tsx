import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image,
  Eye,
  EyeOff
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
}

export function Editor({ value, onChange, placeholder = 'Viết nội dung của bạn...', minHeight = 300 }: EditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = document.getElementById('editor-textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertText('**', '**'), tooltip: 'Đậm' },
    { icon: Italic, action: () => insertText('*', '*'), tooltip: 'Nghiêng' },
    { icon: Underline, action: () => insertText('<u>', '</u>'), tooltip: 'Gạch chân' },
    { icon: Quote, action: () => insertText('> '), tooltip: 'Trích dẫn' },
    { icon: Code, action: () => insertText('`', '`'), tooltip: 'Code' },
    { icon: List, action: () => insertText('- '), tooltip: 'Danh sách' },
    { icon: ListOrdered, action: () => insertText('1. '), tooltip: 'Danh sách số' },
    { icon: Link, action: () => insertText('[', '](url)'), tooltip: 'Liên kết' },
    { icon: Image, action: () => insertText('![alt](', ')'), tooltip: 'Hình ảnh' },
  ]

  const renderPreview = (text: string) => {
    // Simple markdown to HTML conversion for preview
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^1\. (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="p-2 h-8 w-8"
                title={button.tooltip}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2"
          >
            {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {isPreview ? 'Chỉnh sửa' : 'Xem trước'}
          </Button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {isPreview ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 prose max-w-none"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <motion.textarea
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            id="editor-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-none outline-none resize-none font-mono text-sm leading-relaxed"
            style={{ minHeight }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Hỗ trợ Markdown</span>
          <span>{value.length} ký tự</span>
        </div>
      </div>
    </div>
  )
}

