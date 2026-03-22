import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import AddAirplaneForm from "./AirplaneComponent/AddAirplaneForm";
import AddAirportForm from "./AirportComponent/AddAirportForm";
import ViewAllAirplane from "./AirplaneComponent/ViewAllAirplane";
import ViewAllAirport from "./AirportComponent/ViewAllAirport";
import AddFlightForm from "./FlightComponent/AddFlightForm";
import ViewAllFlight from "./FlightComponent/ViewAllFlight";
import UpdateFlightStatusForm from "./FlightComponent/UpdateFlightStatusForm";
import BookFlight from "./FlightBookingComponent/BookFlight";
import MyWallet from "./UserComponent/MyWallet";
import ViewAllFlightBooking from "./FlightBookingComponent/ViewAllFlightBooking";
import ViewPassengerFlightBooking from "./FlightBookingComponent/ViewPassengerFlightBooking";
import ViewScheduledFlightBookings from "./FlightBookingComponent/ViewScheduledFlightBookings";
import API_BASE_URL from "./config";

// ─── Backend Wakeup Screen ───────────────────────────────────────────────────
const BackendWakeup = ({ onReady }) => {
  const [dots, setDots] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const pollRef = useRef(null);

  // Animated dots
  useEffect(() => {
    intervalRef.current = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Elapsed seconds counter
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Poll backend every 3 seconds
  useEffect(() => {
    const ping = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/flight/fetch/all`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok || res.status === 200) {
          clearInterval(pollRef.current);
          clearInterval(timerRef.current);
          clearInterval(intervalRef.current);
          onReady();
        }
      } catch {
        setAttempt(a => a + 1);
      }
    };

    ping(); // immediate first ping
    pollRef.current = setInterval(ping, 3000);
    return () => clearInterval(pollRef.current);
  }, [onReady]);

  const getMessage = () => {
    if (elapsed < 10) return "Connecting to server";
    if (elapsed < 25) return "Server is waking up";
    if (elapsed < 45) return "Almost there, hang tight";
    return "Taking longer than usual, please wait";
  };

  const dotStr = ".".repeat(dots);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #050d1a 0%, #0a1628 50%, #050d1a 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Star field */}
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: Math.random() * 2 + 1 + "px",
          height: Math.random() * 2 + 1 + "px",
          background: "white",
          borderRadius: "50%",
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          opacity: Math.random() * 0.5 + 0.1,
          animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
        }} />
      ))}

      {/* Glow orb */}
      <div style={{
        position: "absolute",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(45,127,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        animation: "pulse-glow 3s ease-in-out infinite",
      }} />

      {/* Airplane icon */}
      <div style={{
        width: "90px", height: "90px",
        background: "linear-gradient(135deg, #2d7fff, #00d4ff)",
        borderRadius: "24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "32px",
        boxShadow: "0 0 60px rgba(45,127,255,0.5)",
        animation: "float 3s ease-in-out infinite",
        position: "relative", zIndex: 1,
      }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"/>
        </svg>
      </div>

      {/* Brand */}
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "2.4rem",
        fontWeight: 800,
        background: "linear-gradient(135deg, #ffffff, #4d9fff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "8px",
        position: "relative", zIndex: 1,
      }}>
        Sky<span style={{ color: "#2d7fff", WebkitTextFillColor: "#2d7fff" }}>Line</span>
      </div>

      <p style={{
        color: "#4a6080", fontSize: "0.85rem",
        letterSpacing: "2px", textTransform: "uppercase",
        marginBottom: "48px", position: "relative", zIndex: 1,
      }}>
        Flight Reservation System
      </p>

      {/* Loading bar */}
      <div style={{
        width: "280px", height: "3px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "99px",
        marginBottom: "24px",
        overflow: "hidden",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #2d7fff, #00d4ff)",
          borderRadius: "99px",
          animation: "loading-bar 2s ease-in-out infinite",
          boxShadow: "0 0 10px rgba(45,127,255,0.8)",
        }} />
      </div>

      {/* Status message */}
      <p style={{
        color: "#7a9abf",
        fontSize: "0.95rem",
        marginBottom: "12px",
        position: "relative", zIndex: 1,
        minWidth: "260px", textAlign: "center",
      }}>
        {getMessage()}{dotStr}
      </p>

      {/* Timer */}
      <p style={{
        color: "#3a5070",
        fontSize: "0.78rem",
        position: "relative", zIndex: 1,
      }}>
        {elapsed}s elapsed · attempt {attempt + 1}
      </p>

      {/* CSS animations */}
      <style>{`
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50%       { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
function App() {
  const [backendReady, setBackendReady] = useState(false);
  const notifiedRef = useRef(false);

  const handleReady = () => {
    setBackendReady(true);
    if (!notifiedRef.current) {
      notifiedRef.current = true;
      setTimeout(() => {
        toast.success("✈ SkyLine is ready! Welcome aboard.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          style: {
            background: "linear-gradient(135deg, #0d1f3c, #1a3a6e)",
            border: "1px solid rgba(45,127,255,0.4)",
            color: "#e8eef8",
            fontFamily: "'DM Sans', sans-serif",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(45,127,255,0.3)",
          },
        });
      }, 300);
    }
  };

  return (
    <div>
      {!backendReady && <BackendWakeup onReady={handleReady} />}

      <div style={{
        opacity: backendReady ? 1 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: backendReady ? "all" : "none",
      }}>
        <Header />
        <Routes>
          <Route path="/"                              element={<HomePage />} />
          <Route path="/home"                          element={<HomePage />} />
          <Route path="/home/all/hotel/location"       element={<HomePage />} />
          <Route path="contact"                        element={<ContactUs />} />
          <Route path="about"                          element={<AboutUs />} />
          <Route path="/user/passenger/register"       element={<UserRegister />} />
          <Route path="/user/login"                    element={<UserLoginForm />} />
          <Route path="/user/admin/register"           element={<AdminRegisterForm />} />
          <Route path="/admin/all/passenger"           element={<ViewAllCustomers />} />
          <Route path="/admin/airplane/add"            element={<AddAirplaneForm />} />
          <Route path="/admin/airport/add"             element={<AddAirportForm />} />
          <Route path="/admin/airplane/all"            element={<ViewAllAirplane />} />
          <Route path="/admin/airport/all"             element={<ViewAllAirport />} />
          <Route path="/admin/flight/add"              element={<AddFlightForm />} />
          <Route path="/admin/flight/all"              element={<ViewAllFlight />} />
          <Route path="/view/flight/all"               element={<ViewAllFlight />} />
          <Route path="/admin/flight/status/update"    element={<UpdateFlightStatusForm />} />
          <Route path="/passenger/flight/book"         element={<BookFlight />} />
          <Route path="/passenger/wallet"              element={<MyWallet />} />
          <Route path="/admin/flight/booking/all"      element={<ViewAllFlightBooking />} />
          <Route path="/passenger/flight/booking/all"  element={<ViewPassengerFlightBooking />} />
          <Route path="/flight/booking/status/"        element={<ViewScheduledFlightBookings />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;