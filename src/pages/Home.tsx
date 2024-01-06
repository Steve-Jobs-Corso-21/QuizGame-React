import { Link, useParams, useSearchParams } from "react-router-dom";
import Epilogue from "./Epilogue";
import Score from "./Score";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link
        to="/quiz/score"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        Vai allo score
      </Link>
      <Link
        to="/quiz/epilogue"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        Vai all'epilogo
      </Link>
    </div>
  );
};

export default Home;
