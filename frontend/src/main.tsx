import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'

const currentPath = window.location.pathname;

function Root() {
  if (currentPath !== '/') {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        <div className="text-center card p-10 max-w-md w-full mx-auto mt-20">
          <h1 className="text-8xl font-bold text-primary-color mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">The page you are looking for doesn't exist or an invalid path was entered.</p>
          <a
            href="/"
            className="px-6 py-3 bg-primary-color hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors inline-block"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
  
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Root />
    </LanguageProvider>
  </StrictMode>,
)
