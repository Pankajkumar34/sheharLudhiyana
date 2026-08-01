import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary italic font-serif mb-4">Shehar Ludhiana</h3>
            <p className="text-sm text-primary-foreground/70">
              Your local guide to the best restaurants, shops, services, and events in Ludhiana.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/explore" className="hover:text-primary transition-colors">Explore</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Food & Dining</li>
              <li>Fashion & Shopping</li>
              <li>Healthcare</li>
              <li>Education</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>info@sheharludhiana.com</li>
              <li>Ludhiana, Punjab, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 Shehar Ludhiana. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
