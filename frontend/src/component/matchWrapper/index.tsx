interface MatchWrapperProps {}

const MatchWrapper: React.FunctionComponent<MatchWrapperProps> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-row-reverse items-center justify-center w-full flex-auto h-full lg:h-screen  text-center">
      <div className="relative flex flex-col bg-black shadow-2xl w-full h-full lg:w-96 lg:h-168">
        {children}
      </div>
    </div>
  );
};

export default MatchWrapper;
