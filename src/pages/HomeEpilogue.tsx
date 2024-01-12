import { Link, useParams, useSearchParams } from "react-router-dom";
import Epilogue from "./Epilogue";
import Headers from "../components/Header";
//import testAnswer from "../testAnswer.json";
const HomeEpilogue = () => {
  return (
    <div>
      <Headers></Headers>
      <h1> Home del riepilogo</h1>
      <Epilogue></Epilogue>

      <Link to="/" style={{ display: "flex", justifyContent: "flex-start" }}>
        Vai alla Home
      </Link>
    </div>
  );
};

export default HomeEpilogue;