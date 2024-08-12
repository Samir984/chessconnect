export default function Loader({
  label,
  loaderClassName,
}: {
  label: string;
  loaderClassName: string;
}) {
  return (
    <div className="flex flex-col mt-8 items-center justify-center">
      <p className="text-gray-400 mb-6">{label}</p>
      <div className={`${loaderClassName}`}></div>
    </div>
  );
}
