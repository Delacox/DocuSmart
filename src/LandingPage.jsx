import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <img src="/logo.svg" alt="Logo" className="logo" />
      <h1>Explora tu documento de forma interactiva</h1> {/* TODO: Personaliza el texto */}
      <button className="enter-btn" onClick={() => navigate('/chat')}>
        Entrar al chat
      </button>
    </div>
  );
} 