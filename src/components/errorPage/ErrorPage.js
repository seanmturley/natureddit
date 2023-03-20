import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const errorResponse = useRouteError();

  return (
    <section className="error">
      <h1 className="error__status">{errorResponse.status}</h1>
      <h2 className="error__name">{errorResponse.statusText}</h2>
      <p className="error__message">
        Please check you have typed the URL correctly, or go back to the
        previous page and try again.
      </p>
    </section>
  );
}

export default ErrorPage;
