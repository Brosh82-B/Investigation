import "./AppHeader.css";
import givatiLogo from "../../img/Logo.png";
function AppHeader() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="image-container" style={{ margin: "0 auto" }}>
          <p>כתיבת תחקיר</p>
          <img src={givatiLogo} alt={givatiLogo} />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
