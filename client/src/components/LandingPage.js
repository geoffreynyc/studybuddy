import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="main-container">
      <nav>
        <Link className="home-link" to="/">
          studybuddy
        </Link>
        <div className="nav-links">
          <Link className="flashcard-link" to="/home">
            flashcards
          </Link>
          <button>sign in</button>
        </div>
      </nav>
      <section>
        <h2>Study on the go, whenever, wherever. </h2>
        <h3>*No pen or pencil required.</h3>
      </section>
    </div>
  );
}

export default LandingPage;
