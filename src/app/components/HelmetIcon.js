const HelmetIcon = ({ className = "", size = 24 }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a8 8 0 0 0-8 8v12h16V10a8 8 0 0 0-8-8z"></path>
      <path d="M17 6c-2.27 0-4.4.6-6.24 1.65"></path>
    </svg>
  );

  export default HelmetIcon;