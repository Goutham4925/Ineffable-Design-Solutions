import { motion } from "framer-motion";
import { Save, Upload, Globe, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { siteSettings } from "@/data/siteSettings";
import Logo from "@/components/Logo";

const AdminSettings = () => {
  const [settings, setSettings] = useState(siteSettings);

  const handleChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      social: { ...prev.social, [platform]: value },
    }));
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your site settings</p>
        </div>
        <button className="btn-primary">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            General
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange("siteName", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={settings.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Logo Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Logo
          </h2>
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-xl bg-secondary/50">
              <Logo className="h-12 w-auto" />
            </div>
            <div>
              <button className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium">
                Upload New Logo
              </button>
              <p className="text-muted-foreground text-xs mt-2">
                Recommended: SVG format, max 2MB
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Phone"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Address"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="text-xl font-display font-semibold mb-6">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.social).map(([platform, url]) => (
              <div key={platform}>
                <label className="block text-sm font-medium mb-2 capitalize">{platform}</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  placeholder={`https://${platform}.com/...`}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;
