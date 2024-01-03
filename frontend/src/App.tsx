import React, { useEffect } from 'react';
import './styles/App.css';
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import LandingPage from "./pages/home/landingPage";
import Contact from "./pages/home/contact";
import Features from "./pages/home/features";
import Pricing from "./pages/home/pricing";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Forgot from "./pages/auth/forgot";
import Reset from "./pages/auth/reset";
import Onboarding from "./pages/auth/onboarding";
import Dashboard from "./pages/app/dashboard";
import Product from "./pages/app/product";
import Tags from "./pages/app/tags";
import Search from "./pages/app/search";
import Notification from "./pages/app/notification";
import Help from "./pages/app/help";
import Reports from "./pages/app/reports";
import Profile from "./pages/app/profile";
import Layout from './components/Layouts/appLayout'
import HomeLayout from './components/Layouts/homeLayout'
import AuthLayout from './components/Layouts/authLayout'


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* landing page routes */}
        <Route path="/" element={
          <HomeLayout>
            <LandingPage />
          </HomeLayout>}
        />
        <Route path="/pricing" element={
          <HomeLayout>
            <Pricing />
          </HomeLayout>}
        />
        <Route path="/features" element={
          <HomeLayout>
            <Features />
          </HomeLayout>}
        />
        <Route path="/contact-us" element={
          <HomeLayout>
            <Contact />
          </HomeLayout>}
        />

        {/* auth routes */}
        <Route path="/auth/login" element={
          <AuthLayout title='Login to your account'>
            <Login />
          </AuthLayout>
        } />
        <Route path="/auth/register" element={
          <AuthLayout title='Register for an account'>
            <Register />
          </AuthLayout>
        } />
        <Route path="/auth/forgot" element={
          <AuthLayout title='Forgot Password'>
            <Forgot />
          </AuthLayout>
        } />
        <Route path="/auth/reset-password/:resetToken" element={
          <AuthLayout title='Password Reset'>
            <Reset />
          </AuthLayout>
        } />
        <Route path="/auth/onboarding" element={
          <AuthLayout title='Set up your account'>
            <Onboarding />
          </AuthLayout>
        } />

        {/* application routes */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/items"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout>
              <Notification />
            </Layout>
          }
        />
        <Route
          path="/help"
          element={
            <Layout>
              <Help />
            </Layout>
          }
        />
        <Route
          path="/tags"
          element={
            <Layout>
              <Tags />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
