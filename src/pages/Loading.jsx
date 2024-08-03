import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="items-center flex justify-center">
      <ReactLoading type="bars" color="#adaaaa" height={100} width={100} />
    </div>
  );
}

export default Loading;
