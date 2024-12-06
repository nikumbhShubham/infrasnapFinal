import React from "react";
import "./HeroSection.css"; // Import the CSS file
import {Link} from 'react-router-dom'
function HeroSection() {
  return (
    <div className="hero-section">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Bondify</div>
        <ul className="nav-links">
          <li>Products</li>
          <li>Solutions</li>
          <li>Resources</li>
          <li>Enterprise</li>
          <li>Pricing</li>
        </ul>
        <button className="sign-in-btn">
          <Link to='/signup'>
          Sign In
          </Link>
          </button>
      </nav>

      {/* Hero Section */}
      <div className="hero-content">
        {/* Blue Strips */}
        <div className="blue-strip left-strip"></div>
        <div className="blue-strip right-strip"></div>

        {/* Main Content */}
        <div className="main-content">
          <h1>
            Integrated <span className="highlight">CRM Solution</span> for Every Industry
          </h1>
          <p>
            Whatever your business, our CRM system can be customized to help you manage customers and increase efficiency.
          </p>
          <div className="button-group">
            <button className="primary-btn">Try for Free</button>
            <button className="secondary-btn">Request a Demo</button>
          </div>
        </div>

        {/* Cards */}
        <div className="card sync-automation-card">
          <h3>Sync Automations</h3>
          <p>The workspace was added as a sales target.</p>
          <button>Classify Records</button>
        </div>
        <div className="card meet-card">
          <h3>Meet, Zoom, Teams</h3>
          <div className="avatars">
            <span className="avatar"></span>
            <span className="avatar"></span>
            <span className="avatar"></span>
          </div>
        </div>
        <div className="card country-sales-card">
          <h3>Top 3 Country Sales</h3>
          <ul>
            <li>🇺🇸 United States - 55%</li>
            <li>🇦🇺 Australia - 25%</li>
            <li>🇫🇷 France - 20%</li>
          </ul>
        </div>
        <div className="card team-collaboration-card">
          <h3>Internal Team Collaboration</h3>
          <p>Make sure to loop in the team for updates on the new product demo for Cristian.</p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        CRM solution trusted by industry leaders to accelerate growth and innovation.
      </footer>
    </div>
  );
}

export default HeroSection;
