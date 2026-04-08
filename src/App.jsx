import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer, FlameGuide, SmoothScrollProvider } from './components';
import {
  HomePage,
  StoryPage,
  PathsPage,
  TuitionPage,
  ProPage,
  BookPage,
  EnrollPage,
  PrivacyPage,
  TermsPage,
} from './pages';
function AppLayout({ children }) {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
      <FlameGuide />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
      <Route
        path="/our-story"
        element={
          <AppLayout>
            <StoryPage />
          </AppLayout>
        }
      />
      <Route
        path="/learning-paths"
        element={
          <AppLayout>
            <PathsPage />
          </AppLayout>
        }
      />
      <Route
        path="/tuition"
        element={
          <AppLayout>
            <TuitionPage />
          </AppLayout>
        }
      />
      <Route
        path="/luminopro"
        element={
          <AppLayout>
            <ProPage />
          </AppLayout>
        }
      />
      <Route
        path="/book"
        element={
          <AppLayout>
            <BookPage />
          </AppLayout>
        }
      />
      <Route
        path="/enroll"
        element={
          <AppLayout>
            <EnrollPage />
          </AppLayout>
        }
      />
      <Route
        path="/privacy"
        element={
          <AppLayout>
            <PrivacyPage />
          </AppLayout>
        }
      />
      <Route
        path="/terms"
        element={
          <AppLayout>
            <TermsPage />
          </AppLayout>
        }
      />
    </Routes>
    </SmoothScrollProvider>
  );
}
