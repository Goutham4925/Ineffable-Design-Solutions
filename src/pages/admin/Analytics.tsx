import { motion } from "framer-motion";
import { TrendingUp, Eye, Users, Clock, ArrowUp, ArrowDown } from "lucide-react";

const analyticsData = {
  overview: [
    { label: "Page Views", value: "45.2K", change: "+12.5%", trend: "up" },
    { label: "Unique Visitors", value: "12.8K", change: "+8.3%", trend: "up" },
    { label: "Avg. Session", value: "3:42", change: "-2.1%", trend: "down" },
    { label: "Bounce Rate", value: "42.3%", change: "-5.7%", trend: "up" },
  ],
  topPages: [
    { page: "/", views: 15420, percentage: 34 },
    { page: "/services", views: 8650, percentage: 19 },
    { page: "/projects", views: 7230, percentage: 16 },
    { page: "/about", views: 5840, percentage: 13 },
    { page: "/contact", views: 4120, percentage: 9 },
  ],
  referrers: [
    { source: "Google", visits: 8420, percentage: 45 },
    { source: "Direct", visits: 4650, percentage: 25 },
    { source: "LinkedIn", visits: 2840, percentage: 15 },
    { source: "Twitter", visits: 1680, percentage: 9 },
    { source: "Dribbble", visits: 1120, percentage: 6 },
  ],
};

const AdminAnalytics = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your website performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.overview.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-display font-bold">{stat.value}</p>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                {stat.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display font-semibold">Top Pages</h2>
          </div>
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm w-8">{index + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{page.page}</span>
                    <span className="text-muted-foreground text-sm">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-display font-semibold">Traffic Sources</h2>
          </div>
          <div className="space-y-4">
            {analyticsData.referrers.map((referrer, index) => (
              <div key={referrer.source} className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm w-8">{index + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{referrer.source}</span>
                    <span className="text-muted-foreground text-sm">{referrer.visits.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full"
                      style={{ width: `${referrer.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mt-8 p-6 rounded-2xl bg-secondary/30 border border-border"
      >
        <p className="text-muted-foreground text-sm text-center">
          📊 This is a demo analytics view. Connect your analytics provider (Google Analytics, Plausible, etc.) 
          in the backend to display real data.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
