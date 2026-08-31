import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer, FlameGuide, SmoothScrollProvider } from './components';
import {
  HomePage,
  StoryPage,
  PathsPage,
  TuitionPage,
  BookPage,
  EnrollPage,
  PrivacyPage,
  TermsPage,
  MySpacePage,
  LoginPage,
  SchoolsPage,
  TechnologyPage,
  ContactPage,
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
        path="/how-we-teach"
        element={
          <AppLayout>
            <TuitionPage />
          </AppLayout>
        }
      />
      <Route path="/tuition" element={<Navigate to="/how-we-teach" replace />} />
      <Route path="/pricing" element={<Navigate to="/how-we-teach" replace />} />
      <Route
        path="/book"
        element={
          <AppLayout>
            <BookPage />
          </AppLayout>
        }
      />
      <Route
        path="/schools"
        element={
          <AppLayout>
            <SchoolsPage />
          </AppLayout>
        }
      />
      <Route
        path="/technology"
        element={
          <AppLayout>
            <TechnologyPage />
          </AppLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <AppLayout>
            <ContactPage />
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
      <Route
        path="/my-space"
        element={
          <AppLayout>
            <MySpacePage />
          </AppLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AppLayout>
            <LoginPage />
          </AppLayout>
        }
      />
    </Routes>
    </SmoothScrollProvider>
  );
}
