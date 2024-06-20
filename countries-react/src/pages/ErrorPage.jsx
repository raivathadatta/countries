function ErrorPage() {
  return (
    <>
      <div className="flex flex-col justify-center align-middle">
        <h1 className="text-5xl font-bold text-center">404 Not Found</h1>
        <button className=" " onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default ErrorPage;
