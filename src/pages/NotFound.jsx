import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-not-found">
      <h1>Alguns caminhos não levam onde esperávamos...</h1>
      <h2>
        Mas há sempre histórias esperando para serem contadas. Volte para a{" "}
        <Link to="/">página inicial</Link> ou explore nosso menu.
      </h2>
    </div>
  );
}
