
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formFeedback = document.getElementById("formFeedback");

  async function handleSubmit(event) {
  event.preventDefault(); // Blocca il reindirizzamento standard di Formspree

  const originalBtnText = submitBtn.innerText;
  submitBtn.innerText = "Invio in corso...";
  submitBtn.disabled = true;

  const data = new FormData(event.target);

  fetch(event.target.action, {
  method: contactForm.method,
  body: data,
  headers: {
  'Accept': 'application/json'
}
}).then(response => {
  if (response.ok) {
  formFeedback.innerText = "Messaggio inviato con successo! Ti risponderò presto.";
  formFeedback.style.color = "green";
  contactForm.reset();
} else {
  response.json().then(data => {
  if (Object.hasOwn(data, 'errors')) {
  formFeedback.innerText = data["errors"].map(error => error["message"]).join(", ");
} else {
  formFeedback.innerText = "Oops! C'è stato un problema nell'invio.";
}
  formFeedback.style.color = "red";
});
}
  formFeedback.style.display = "block";
  submitBtn.innerText = originalBtnText;
  submitBtn.disabled = false;
}).catch(error => {
  formFeedback.innerText = "Oops! Errore di connessione.";
  formFeedback.style.color = "red";
  formFeedback.style.display = "block";
  submitBtn.innerText = originalBtnText;
  submitBtn.disabled = false;
});
}

  contactForm.addEventListener("submit", handleSubmit);

  const sections = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-in'); });
  }, { threshold: 0.15 });
  sections.forEach(s => observer.observe(s));
