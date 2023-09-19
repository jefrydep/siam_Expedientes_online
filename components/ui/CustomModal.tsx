interface PropsModal {
  isOpen: boolean;
  children: React.ReactNode;
}
const CustomMolal = ({ isOpen, children }: PropsModal) => {
  return (
    <>
      {isOpen && (
        <div className="fixed   left-0 top-0  flex  shadow-2xl   items-center justify-center bg-opacity-90  bg-black h-full w-full overflow-y-auto overflow-x-hidden outline-none">
          {children}
        </div>
      )}
    </>
  );
};

export default CustomMolal;
