import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribeClick = () => {
    setModalOpen(true);
  };

  function sendEmail(e) {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      email: email,
      message: message
    };

    emailjs
      .send(
        "service_pqz378f",
        "template_187l88g",
        templateParams,
        "r2lAfeoNk4YXg0SND"
      )
      .then(
        (response) => {
          console.log(
            "EMAIL ENVIADO COM SUCESSO",
            response.status,
            response.text
          );
          setEmail("");
          setName("");
          setMessage("")
        },
        (err) => {
          console.log("ERRO: ", err);
        }
      );
  }

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2023-05-30T00:00:00"); // data alvo do lançamento
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="background-images">
      <div className="background-images rocket">
        <h1 className="title">READY TO LAUNCH IN...</h1>

        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-item-text">DIAS</span>
            <span className="countdown-item-number">
              {countdown.days.toString().padStart(2, "0")} :
            </span>
          </div>
          <div className="countdown-item">
            <span className="countdown-item-text">HORAS</span>
            <span className="countdown-item-number">{countdown.hours} :</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-item-text">MINUTOS</span>
            <span className="countdown-item-number">{countdown.minutes} :</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-item-text">SEGUNDOS</span>
            <span className="countdown-item-number">{countdown.seconds}</span>
          </div>
        </div>
        <div className="subtitle">
          <h1>Faça o seu contato para saber mais sobre o lançamento</h1>
        </div>
        <button className="btn" onClick={handleSubscribeClick}>
         Contato
        </button>
        <form onSubmit={sendEmail}>
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span
                  className="modal-close"
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </span>
                <h1>Faça seu Contato</h1>
                <p>Nome</p>
                <input
                  type="text"
                  placeholder="Seu Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email@Email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <p>Mensagem para contato</p>
                <textarea
                  rows="5"
                  placeholder="Digite sua mensagem aqui"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  required
                  style={{ width: "100%", borderRadius: "10px", border: "1px solid blueviolet", color: "blueviolet" }}
                />
                <p>Sera enviado um email para mim com essas ☝️ informaçoes! </p>
                <button type="submit" className="btn-cadastro">
                  Enviar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
