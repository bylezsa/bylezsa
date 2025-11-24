import "../styles/HelpChatButton.css";

export default function HelpChatButton() {
  const phone = "5215555555555"; 
  const message = encodeURIComponent("¡Hola! Tengo una consulta sobre Las AA Store.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="helpchat-btn"
      aria-label="Chatea por WhatsApp"
    >
      <svg className="helpchat-icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48zm-8.52 17a9 9 0 1 1 9-9 9 9 0 0 1-9 9zm4.29-6.1c-.23-.12-1.36-.67-1.57-.75s-.36-.12-.51.12-.59.75-.72.9-.27.17-.5.06a7.36 7.36 0 0 1-2.16-1.34 8.13 8.13 0 0 1-1.51-1.87c-.16-.27 0-.41.12-.53.12-.12.27-.31.4-.47a.45.45 0 0 0 .06-.48c-.06-.12-.51-1.23-.7-1.68s-.37-.37-.51-.38h-.43a.87.87 0 0 0-.63.29 2.63 2.63 0 0 0-.83 2c0 1.18.85 2.32 1 2.48a10.13 10.13 0 0 0 3.13 2.44c.44.19.78.3 1.05.39.44.14.84.12 1.16.07.36-.06 1.11-.45 1.27-.89s.16-.81.11-.89z"
        />
      </svg>
      <span className="helpchat-text">¿Necesitas ayuda?</span>
    </a>
  );
}
