import "../styles/aboutPage.css";
import logo from "../images/tmdb-logo.svg";

function AboutPage() {
  return (
    <div className="text-wrapper">
      <h3>About</h3>
      <br />
      <p>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
      <img className="logo" src={logo} alt="TMDB logo" />
    </div>
  );
}

export default AboutPage;
