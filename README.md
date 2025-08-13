#ENV
VITE_BASE_API_URL=http://localhost:3003

# English Learning Community - Ứng dụng học tiếng Anh UGC

## 🎯 Mô tả dự án

Ứng dụng web học tiếng Anh theo mô hình cộng đồng (UGC) được xây dựng với React TypeScript, cho phép người học và giáo viên chia sẻ, tương tác các bài tập và bài học tiếng Anh.

## 🚀 Demo

**Live Demo:** https://xxqvucvk.manus.space

## ✨ Tính năng chính

### 🔐 Xác thực người dùng
- Trang đăng ký với form validation
- Trang đăng nhập với UI đẹp
- Mock API authentication

### 📚 Quản lý bài học
- Danh sách bài học với bộ lọc và tìm kiếm
- Chi tiết bài học với nội dung đầy đủ
- Hệ thống like và bookmark
- Phân loại theo loại và trình độ

### 💬 Tương tác cộng đồng
- Hệ thống bình luận với reply
- Like/unlike comments
- Hiển thị thông tin tác giả và vai trò

### ✍️ Tạo nội dung
- Editor markdown với toolbar
- Preview mode
- Form validation với Zod
- Upload và quản lý tags

### 🤖 Tích hợp AI Mock
- Kiểm tra ngữ pháp với gợi ý sửa lỗi
- Tạo quiz từ nội dung bài học
- Tạo flashcard tự động
- UI modal với kết quả chi tiết

## 🛠️ Công nghệ sử dụng

### Frontend Framework
- **React 18** với TypeScript
- **Vite** cho build tool
- **React Router DOM** cho routing

### UI/UX
- **TailwindCSS** cho styling
- **Shadcn/UI** components
- **Lucide React** icons
- **Framer Motion** cho animations

### Form & Validation
- **React Hook Form** cho form management
- **Zod** cho schema validation

### State Management
- **React Query (TanStack Query)** cho API state
- **Axios** cho HTTP requests

## 📁 Cấu trúc dự án

```
src/
├── components/          # Components tái sử dụng
│   ├── Navbar.tsx      # Navigation bar
│   ├── LessonCard.tsx  # Card hiển thị bài học
│   ├── CommentBox.tsx  # Component bình luận
│   ├── Editor.tsx      # Markdown editor
│   └── AIActionBar.tsx # Thanh công cụ AI
├── pages/              # Các trang chính
│   ├── HomePage.tsx    # Trang chủ
│   ├── LoginPage.tsx   # Trang đăng nhập
│   ├── RegisterPage.tsx # Trang đăng ký
│   ├── LessonsPage.tsx # Danh sách bài học
│   ├── LessonDetailPage.tsx # Chi tiết bài học
│   └── CreateLessonPage.tsx # Tạo bài học mới
├── api/                # Mock API và data
│   └── mockData.ts     # Dữ liệu giả lập
├── types/              # TypeScript types
│   └── index.ts        # Định nghĩa types
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 🎨 Thiết kế UI/UX

### Màu sắc
- **Primary:** Blue gradient (#3B82F6 → #1D4ED8)
- **Secondary:** Green (#10B981)
- **Accent:** Purple, Orange, Pink cho lesson cards
- **Neutral:** Gray scale cho text và backgrounds

### Typography
- **Font:** System fonts với fallback
- **Sizes:** Responsive từ mobile đến desktop
- **Hierarchy:** Clear heading và body text

### Layout
- **Responsive:** Mobile-first design
- **Grid:** CSS Grid và Flexbox
- **Spacing:** Consistent padding/margin
- **Navigation:** Fixed header với search

### Animations
- **Hover effects:** Scale và color transitions
- **Loading states:** Skeleton loaders
- **Page transitions:** Smooth navigation
- **Micro-interactions:** Button feedback

## 🔧 Cài đặt và chạy

### Prerequisites
- Node.js 18+
- pnpm (recommended) hoặc npm

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd english-learning-app

# Cài đặt dependencies
pnpm install

# Chạy development server
pnpm run dev

# Build cho production
pnpm run build

# Preview production build
pnpm run preview
```

### Scripts
- `pnpm run dev` - Chạy development server
- `pnpm run build` - Build cho production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Chạy ESLint

## 📱 Responsive Design

Ứng dụng được thiết kế responsive hoàn toàn:

- **Mobile (< 768px):** Single column layout, touch-friendly
- **Tablet (768px - 1024px):** Two column grid
- **Desktop (> 1024px):** Three column grid với sidebar

## 🎭 Mock Features

### AI Features (Simulated)
- **Grammar Check:** Phát hiện và sửa lỗi ngữ pháp
- **Quiz Generation:** Tạo câu hỏi trắc nghiệm từ nội dung
- **Flashcard Creation:** Tạo flashcard từ từ vựng

### API Simulation
- **Authentication:** Mock login/register
- **CRUD Operations:** Create, read, update lessons
- **Comments System:** Nested comments với replies
- **Search & Filter:** Real-time filtering

## 🚀 Deployment

Ứng dụng được deploy trên Manus Platform:
- **URL:** https://xxqvucvk.manus.space
- **CDN:** Global content delivery
- **SSL:** HTTPS enabled
- **Performance:** Optimized build

## 🔮 Tương lai

### Planned Features
- Real backend integration
- User authentication với JWT
- Real-time chat
- Video lessons support
- Progress tracking
- Gamification elements

### Technical Improvements
- Unit testing với Jest
- E2E testing với Playwright
- PWA capabilities
- Offline support
- Performance monitoring

## 👥 Đóng góp

Dự án này được tạo ra như một demo showcase. Để đóng góp:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push và tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🙏 Acknowledgments

- **Shadcn/UI** cho component library
- **TailwindCSS** cho utility-first CSS
- **Lucide** cho icon set
- **React ecosystem** cho các tools mạnh mẽ

---

**Được xây dựng với ❤️ bởi Manus AI**

