import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAndGetUser } from "../../services/auth";

import Logo from "@assets/Logo.svg";
import Illustration from "@assets/boneco.png";
import FacebookIcon from "@assets/facebook.png";
import GoogleIcon from "@assets/google.png";
import AppleIcon from "@assets/apple.png";

import "./Login.scss";
import "@styles/Global.scss";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      setError("Preencha todos os campos");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const user = await loginAndGetUser({ email, password: senha });
      console.log("Usuário logado:", user);
      navigate("/dashboard");
    } catch (err) {
      const apiMsg = err?.response?.data || err?.message || "Falha no login";
      console.log("Erro no login:", apiMsg);
      setError(typeof apiMsg === "string" ? apiMsg : "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={Logo} alt="Logo MeuGestor" className="logo" />

        <h1>
          Faça seu login em <br />
          <span className="spn1">Meu</span>
          <span className="spn2">Gestor</span>
        </h1>

        <div className="login-info">
          <p>
            Se você ainda não tem uma conta,<br />
            Você pode se <a href="/register">Registrar aqui!</a>
          </p>
          <img src={Illustration} alt="Ilustração" className="illustration" />
        </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="forgot">
            <a href="#">Esqueceu sua senha?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Login"}
          </button>

          <div className="social-login">
            <p>ou continue com</p>
            <div className="icons">
              <img src={FacebookIcon} alt="Facebook" />
              <img src={AppleIcon} alt="Apple" />
              <img src={GoogleIcon} alt="Google" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
