import React from 'react'
import AppRoutes from '../routes/AppRoutes'
import { useNavigate } from 'react-router-dom'

export default function Login() {
const navigate = useNavigate();


  return (
    <div>Login
        <p style={{color: "red"}}>Esta es la pantalla de login</p>
        <button onClick={() => navigate("/waifus")}>Pantalla Waifu 🥵🥵🥵</button>

    </div>

  )
}
