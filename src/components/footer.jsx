import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2 className="logo">MyShop</h2>

          <div className="socials">
            <a href="#"><i className="bi bi-facebook text-primary"></i> Facebook</a>
            <a href="#"><i className="bi bi-youtube text-danger"></i> Youtube</a>
            <a href="#"><i className="bi bi-telegram text-info"></i> Telegram</a>
            <a href="#"><i className="bi bi-twitter"></i> Twitter</a>
          </div>
        </div>

        {/* Column 1 */}
        <div className="footer-col">
          <h4>Getting started</h4>
          <a href="#">Release Notes</a>
          <a href="#">Upgrade Guide</a>
          <a href="#">Browser Support</a>
          <a href="#">Dark Mode</a>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="#">Prototyping</a>
          <a href="#">Design systems</a>
          <a href="#">Pricing</a>
          <a href="#">Security</a>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Best practices</a>
          <a href="#">Support</a>
          <a href="#">Developers</a>
          <a href="#">Learn design</a>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Community</h4>
          <a href="#">Discussion Forums</a>
          <a href="#">Code of Conduct</a>
          <a href="#">Contributing</a>
          <a href="#">API Reference</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
