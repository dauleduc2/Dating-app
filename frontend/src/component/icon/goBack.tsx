interface GoBackIconProps {
  className?: string;
}

const GoBackIcon: React.FunctionComponent<GoBackIconProps> = ({
  className,
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 9V5L3 12L10 19V14.9C15 14.9 18.5 16.5 21 20C20 15 17 10 10 9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default GoBackIcon;
