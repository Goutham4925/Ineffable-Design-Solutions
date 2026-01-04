import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]"
      />
      <div className="container-wide relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-[150px] md:text-[200px] font-display font-bold leading-none gradient-text mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto">The page you're looking for doesn't exist.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary"><Home className="w-4 h-4 mr-2" />Back to Home</Link>
            <button onClick={() => window.history.back()} className="btn-outline"><ArrowLeft className="w-4 h-4 mr-2" />Go Back</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
