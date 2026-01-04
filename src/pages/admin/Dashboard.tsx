import { motion } from "framer-motion";
import { 
  FileText, 
  Briefcase, 
  Users, 
  MessageSquare,
  TrendingUp,
  Eye,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import { teamMembers } from "@/data/team";

const stats = [
  { label: "Services", value: services.length, icon: FileText, href: "/admin/services", color: "from-cyan-500 to-blue-500" },
  { label: "Projects", value: projects.length, icon: Briefcase, href: "/admin/projects", color: "from-violet-500 to-purple-500" },
  { label: "Team Members", value: teamMembers.length, icon: Users, href: "/admin/team", color: "from-pink-500 to-rose-500" },
  { label: "Testimonials", value: testimonials.length, icon: MessageSquare, href: "/admin/testimonials", color: "from-amber-500 to-orange-500" },
];

const recentActivity = [
  { action: "Project updated", item: "Nexus Financial Platform", time: "2 hours ago" },
  { action: "New testimonial", item: "Alexandra Chen", time: "5 hours ago" },
  { action: "Service edited", item: "UI/UX Design", time: "1 day ago" },
  { action: "Team member added", item: "Emily Park", time: "2 days ago" },
];

const AdminDashboard = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={stat.href}
              className="block p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-3xl font-display font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-muted-foreground text-sm">{activity.item}</p>
                </div>
                <span className="text-muted-foreground text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/services"
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
            >
              <FileText className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Add Service</p>
            </Link>
            <Link
              to="/admin/projects"
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
            >
              <Briefcase className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Add Project</p>
            </Link>
            <Link
              to="/admin/team"
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
            >
              <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Add Team Member</p>
            </Link>
            <Link
              to="/admin/testimonials"
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-center"
            >
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Add Testimonial</p>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Analytics Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-8 p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold">Analytics Overview</h2>
          <Link to="/admin/analytics" className="text-primary text-sm font-medium hover:underline">
            View Details
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-xl bg-secondary/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">12.5K</span>
            </div>
            <p className="text-muted-foreground text-sm">Page Views</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">3.2K</span>
            </div>
            <p className="text-muted-foreground text-sm">Visitors</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-secondary/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">+24%</span>
            </div>
            <p className="text-muted-foreground text-sm">Growth</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
