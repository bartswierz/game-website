interface PageHeaderProps {
  title: string;
  count: number;
  countType: string;
  hidePlus?: boolean;
}

const PageHeader = ({ title, count, countType, hidePlus = false }: PageHeaderProps) => {
  return (
    <>
      <div className="flex text-4xl font-semibold mb-6 flex-col sm:flex-row text-center sm:text-start align-items center text-white">
        <span className="text-2xl xsm:text-4xl">{title.toUpperCase().replace("%20", " ")}</span>
        <span className="text-base text-gray-500 sm:ml-2 sm:self-end">
          {count}
          {hidePlus ? "" : "+"} {countType}
        </span>
      </div>
    </>
  );
};

export default PageHeader;
