import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ProfilePage = () => {
  const { user, logoutUser, isLogin } = useAuth();
  const handleLogout = () => {
    logoutUser.mutate();
  };

  if (!isLogin) {
    return (
      <div className="container mx-auto py-12 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-bold">Profile not available</h1>
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-2xl mx-auto overflow-hidden shadow-lg">
        <div className="bg-gray-100 dark:bg-gray-800 h-32" />
        <CardHeader className="flex flex-col items-center text-center -mt-16">
          <Avatar
            className="w-24 h-24 border-4 border-white dark:border-gray-900"
            style={{
              backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
            }}
          >
            <AvatarImage src={user?.avatar || "/placeholder-avatar.png"} alt={user?.username} />
            <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold mt-4">{user?.username}</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            {user?.email}
          </CardDescription>
          <Badge variant="outline" className="mt-2">
            {user?.role}
          </Badge>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Information</h3>
            <div className="flex items-center gap-4">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.username}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-300">
                Joined on {new Date(user?.createdAt || '').toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
             <Button onClick={handleLogout} variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


