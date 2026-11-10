
const WHATSAPP_NUMERO = "";
const WHATSAPP_MENSAJE = "Hola Sefton, quiero información sobre sus productos.";

function enlaceWhatsApp(mensaje) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensaje);
}

document.querySelectorAll("[data-wa]").forEach(function (el) {
  if (!WHATSAPP_NUMERO) {
    el.setAttribute("href", "#contacto");
    el.setAttribute("title", "Número de WhatsApp pendiente");
    return;
  }
  el.setAttribute("href", enlaceWhatsApp(el.dataset.waMsg || WHATSAPP_MENSAJE));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

if (!WHATSAPP_NUMERO) {
  console.warn("Falta configurar WHATSAPP_NUMERO en script.js");
}

const MARCAS = [
  { nombre: "Samsung",  logo: "samsung.svg" },
  { nombre: "Apple",    logo: "apple.svg", mono: true },
  { nombre: "Xiaomi",   logo: "xiaomi.svg" },
  { nombre: "POCO",     logo: "poco.svg" },
  { nombre: "Honor",    logo: "honor.svg", mono: true },
  { nombre: "Motorola", logo: "motorola.svg" },
  { nombre: "OPPO",     logo: "oppo.svg", mono: true },
  { nombre: "realme",   logo: "realme.svg" },
  { nombre: "Tecno",    logo: "tecno.svg" },
  { nombre: "Infinix",  logo: "infinix.svg", mono: true },
  { nombre: "JBL",      logo: "jbl.svg" },
  { nombre: "Kalley",   logo: "kalley.svg" },
  { nombre: "TCL",      logo: "tcl.svg" },
  { nombre: "Lenovo",   logo: "lenovo.svg" },
  { nombre: "HP",       logo: "hp.svg", mono: true },
  { nombre: "Acer",     logo: "acer.svg" }
];

function crearMarca(marca, duplicado) {
  const li = document.createElement("li");
  li.className = "marquee__item";
  if (duplicado) li.setAttribute("aria-hidden", "true");

  const img = document.createElement("img");
  img.src = "assets/marcas/" + marca.logo;
  img.alt = duplicado ? "" : marca.nombre;
  img.title = marca.nombre;
  if (marca.mono) img.classList.add("mono");
  img.onerror = function () {
    const texto = document.createElement("span");
    texto.className = "marquee__name";
    texto.textContent = marca.nombre;
    img.replaceWith(texto);
  };
  li.appendChild(img);
  return li;
}

function crearMas(duplicado) {
  const li = document.createElement("li");
  li.className = "marquee__item";
  if (duplicado) li.setAttribute("aria-hidden", "true");
  li.innerHTML = '<span class="marquee__name marquee__more">y muchas más</span>';
  return li;
}

const pista = document.getElementById("marcas");
if (pista) {
  // La lista se pone dos veces para que el carrusel gire sin cortes.
  [false, true].forEach(function (duplicado) {
    MARCAS.forEach(function (m) { pista.appendChild(crearMarca(m, duplicado)); });
    pista.appendChild(crearMas(duplicado));
  });
  pista.style.setProperty("--duracion", (MARCAS.length * 3) + "s");
}

/* Menú en celular */
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", function () {
  const abierto = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", abierto);
});
nav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

/* Encabezado con fondo al hacer scroll */
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}, { passive: true });

/* Visor de la galería */
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");
document.querySelectorAll(".gallery__item").forEach(function (item) {
  item.addEventListener("click", function () {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox__close").addEventListener("click", function () {
  lightbox.close();
});
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) lightbox.close();
});

/* Año actual en el pie de página */
document.getElementById("year").textContent = new Date().getFullYear();