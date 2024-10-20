const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  console.log(searchParams);
  return (
    <div className="">
      {searchParams.status == "Completed" ? (
        <span className="text-green-500 p-2">
          Payement success : {searchParams.status}
        </span>
      ) : (
        <span className="text-red-500">{searchParams.status}</span>
      )}
    </div>
  );
};

export default Page;
