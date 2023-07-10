// TODO - Pass in text(next or back) & URL to call
interface NavigationButtonProps {
  text: string;
  request: string;
  // getPageContent: (getPage: string) => void;
  onPageChange: (request: string, pageDirection: string) => void;
  pageDirection: "next" | "prev";
}

const NavigationButton = async ({ text, request, onPageChange, pageDirection }: NavigationButtonProps) => {
  // TODO - do the API REQUEST CALL HERE TO FETCH NEXT OR PREVIOUS PAGE
  // const response = await fetch(request);
  // const data = await response.json();

  const fetchPage = async () => {
    console.log("inside navigation page fetchPage");
    // const response = await fetch(request);
    // const data = await response.json();
    console.log("request: ", request);
    //Callback to update state in parent component
    //TODO - expects request url string and pageDirection string
    onPageChange(request, pageDirection);
    // return data;
  };

  return (
    <button
      type="button"
      onClick={() => fetchPage()}
      className="border px-4 py-2 hover:bg-slate-600 focus:bg-slate-700 rounded-md m-1"
    >
      {text}
    </button>
  );
};

export default NavigationButton;
