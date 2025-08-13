import { Link } from "react-router-dom";
import { BookOpen, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function HomePage() {
  const {isLogin} = useAuth();
  const features = [
    {
      icon: BookOpen,
      title: "Bài học đa dạng",
      description:
        "Hàng ngàn bài học từ cơ bản đến nâng cao, được tạo bởi cộng đồng giáo viên và học viên.",
    },
    {
      icon: Users,
      title: "Cộng đồng học tập",
      description:
        "Kết nối với hàng triệu người học tiếng Anh trên toàn thế giới, chia sẻ kinh nghiệm và học hỏi lẫn nhau.",
    },
    {
      icon: Star,
      title: "Chất lượng cao",
      description:
        "Tất cả bài học được đánh giá và xếp hạng bởi cộng đồng, đảm bảo chất lượng học tập tốt nhất.",
    },
    {
      icon: TrendingUp,
      title: "Theo dõi tiến độ",
      description:
        "Theo dõi quá trình học tập của bạn với các thống kê chi tiết và hệ thống thành tích.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Bài học" },
    { number: "100K+", label: "Học viên" },
    { number: "5K+", label: "Giáo viên" },
    { number: "4.8/5", label: "Đánh giá" },
  ];

  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Học tiếng Anh cùng
          <span className="text-blue-600"> cộng đồng</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Tham gia cộng đồng học tiếng Anh lớn nhất Việt Nam. Chia sẻ, học hỏi
          và phát triển kỹ năng tiếng Anh cùng hàng triệu người học khác.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={isLogin ? "/lessons" : "/register" }>
            <Button size="lg" className="text-lg px-8 py- cursor-pointer">
              Bắt đầu học ngay
            </Button>
          </Link>
          <Link to="/lessons">
            <Button variant="outline" size="lg" className="text-lg px-8 py- cursor-pointer">
              Khám phá bài học
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-blue-50 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Tại sao chọn EnglishHub?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sẵn sàng bắt đầu hành trình học tiếng Anh?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Tham gia cộng đồng ngay hôm nay và khám phá hàng ngàn bài học chất
          lượng cao.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3 cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white "
            >
              Đăng ký miễn phí
            </Button>
          </Link>
          <Link to="/create-lesson">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Tạo bài học
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
