// TODO - Pass in text(next or back) & URL to call
interface NavigationButtonProps {
  text: string;
  request: string;
  onClick: () => void;
}

const NavigationButton = async ({ text, request, onClick }: NavigationButtonProps) => {
  // TODO - do the API REQUEST CALL HERE TO FETCH NEXT OR PREVIOUS PAGE
  // const response = await fetch(request);
  // const data = await response.json();

  const fetchPage = async () => {
    const response = await fetch(request);
    const data = await response.json();
    return data;
  };

  return (
    <button type="button" onClick={() => fetchPage()}>
      {text}
    </button>
  );
};

export default NavigationButton;
