import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); // for triggering fade-out
  const navigate = useNavigate();

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  }, []);

  // When loading reaches 100%, start fade-out
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true); // trigger fade-out animation
      }, 300);
    }
  }, [progress]);

  // After fade-out animation ends, navigate to homepage
  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => {
        navigate('/homepage');
      }, 300); // wait for fade-out to complete before navigating
      return () => clearTimeout(timeout);
    }
  }, [fadeOut, navigate]);

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src="pictures/LVBG.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover opacity-40 brightness-75"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="pictures/logo.png"
          alt="Logo"
          className="w-[30rem] mb-6 z-10"
        />
        <div className="w-[430px] h-[14px] bg-white rounded-full overflow-hidden">
          <div
            className="h-full bg-[#556689] transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
