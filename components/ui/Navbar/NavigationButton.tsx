// TODO - Pass in text(next or back) & URL to call
interface NavigationButtonProps {
  text: string;
  request: string | null;
  // getPageContent: (getPage: string) => void;
  onPageChange: (request: string, pageDirection: string) => void;
  pageDirection: "next" | "prev";
  active: "active" | "inactive";
}

const NavigationButton = async ({ text, request, onPageChange, pageDirection, active }: NavigationButtonProps) => {
  //Callback to update state in parent component
  const fetchPage = () => {
    if (request) onPageChange(request, pageDirection);
  };

  // Active & Inactive Button Styling
  const activeStyles: string = "hover:bg-blue-700 focus:bg-blue-800";
  const inactiveStyles: string = "text-white hover:bg-blue-600 opacity-50";

  return (
    <button
      type="button"
      onClick={fetchPage}
      className={`px-4 py-2 bg-blue-600 rounded-md m-1 ${active === "active" ? activeStyles : inactiveStyles}`}
      disabled={active !== "active"}
    >
      {text}
    </button>
  );
};

export default NavigationButton;
