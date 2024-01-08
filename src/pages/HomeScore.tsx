import { Link, useParams, useSearchParams } from "react-router-dom";
import Score from "./Score";

const HomeScore = () => {
  return (
    <div>
      <h1> Home dello score</h1>
      <Score></Score>
      <Link to="/" style={{ display: "flex", justifyContent: "flex-start" }}>
        Vai alla Home
      </Link>
    </div>
  );
};
