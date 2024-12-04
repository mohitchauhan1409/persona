import { useNavigate, useRouter } from '@tanstack/react-router';

const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const handleBack = () => {
    switch (currentPath) {
      case '/video-upload':
        navigate({ to: '/create' });
        break;
      case '/image-upload':
        navigate({ to: '/video-upload' });
        break;
      case '/audio-upload':
        navigate({ to: '/image-upload' });
        break;
      case '/document-upload':
        navigate({ to: '/audio-upload' });
        break;
      case '/create':
        navigate({ to: '/' });
        break;
      default:
        navigate({ to: '/' });
    }
  };

  return (
    <div className="flex items-center gap-3 text-white mb-16">
      {currentPath !== '/' && (
        <button 
          onClick={handleBack}
          className="hover:bg-[#2a2a2a] p-2 rounded-full transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}
      <h1 className="text-2xl font-medium">Create a new Persona</h1>
    </div>
  );
};

export default Header;