import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Landing from './pages/Landing';
import AcceptKfs from './pages/AcceptKfs';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';

function App() {


  return (      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/kfs/:loanId/:documentId" element={<Landing />} />
        <Route path="/accept-kfs/:loanId/:documentId" element={<AcceptKfs />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;