import { Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar';
import Imagine from './Pages/Imagine';
import  FaceProfiles from './Pages/FaceProfiles';
import  Upscale from './Pages/UpScale';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import PageLayout from './Pages/PageLayout';
import SubscriptionScreen from './Pages/Payment';

function App() {
  return (
    <div>
      <SignedIn>
        <Sidebar />
      </SignedIn>
      <div className="w-[1422px] h-screen text-white">
  <SignedOut>
    <div className="flex items-center justify-center h-full">
      <SignIn />
    </div>
  </SignedOut>
  <SignedIn>
    <PageLayout>
      <Routes>
        <Route path="/" element={<Imagine />} />
        <Route path="/face-profiles" element={<FaceProfiles />} />
        <Route path="/upscale" element={<Upscale />} />
        <Route path="/payment" element={<SubscriptionScreen />} />
      </Routes>
    </PageLayout>
  </SignedIn>
</div>

    </div>
  );
}

export default App;
