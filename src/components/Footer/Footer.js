import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="company items">
        <h3>Company</h3>
        <ul>
          <li>About us</li>
          <li>Team</li>
          <li>Careers</li>
          <li>Swiggy Blog</li>
          <li>Bug Bounty</li>
          <li>Swiggy One</li>
          <li>Swiggy Corporate</li>
          <li>Swiggy Instamart</li>
          <li>Swiggy Genie</li>
        </ul>
      </div>
      <div className="contact items">
        <h3>Contact</h3>
        <ul>
          <li>Help & Support</li>
          <li>Partner with us</li>
          <li>Ride with us</li>
        </ul>
      </div>
      <div className="legal items">
        <h3>Legal</h3>
        <ul>
          <li>Terms & Conditions</li>
          <li>Refund & Cancellation</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
          <li>Offer Terms</li>
          <li>Phishing & Fraud</li>
          <li>Corporate – Swiggy Money Codes Terms and Conditions</li>
          <li>Corporate - Swiggy Discount Voucher Terms and Conditions</li>
        </ul>
      </div>
      <div className="download-app">
        <div className="ios">
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
            alt="ios"
          />
        </div>
        <div className="android">
          <img
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
            alt="android"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
