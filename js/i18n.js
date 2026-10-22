(() => {
  const STORAGE_KEY = "balearbol-lang";
  const SUPPORTED = ["en", "es", "de"];

  /** @type {Record<string, Record<string, string>>} */
  const strings = {
    en: {
      "meta.homeTitle": "Tree Surgery & Arboriculture in Ibiza | Balearbol",
      "meta.homeDesc":
        "Insured tree surgery, forestry work, fire breaks and storm call-outs across Ibiza and the Balearics. Safe climbing and clearance by Balearbol S.L.",
      "meta.contactTitle": "Request a Quote | Tree Surgery Ibiza | Balearbol",
      "meta.contactDesc":
        "Request a quote from Balearbol for tree surgery, fire breaks or storm damage in Ibiza. Call +34 620 059 167 for emergency dispatch.",

      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.team": "Team",
      "nav.safety": "Safety",
      "nav.gallery": "Gallery",
      "nav.contact": "Contact",
      "nav.quote": "Request a Quote",
      "nav.openMenu": "Open menu",
      "nav.closeMenu": "Close menu",
      "nav.primary": "Primary",
      "nav.mobile": "Mobile",
      "nav.footer": "Footer",
      "nav.language": "Language",

      "topbar.emergency": "Emergency dispatch:",
      "aria.instagram": "Balearbol on Instagram",
      "aria.facebook": "Balearbol on Facebook",
      "aria.maps": "Open Ibiza on Google Maps",
      "aria.hero": "Introduction",
      "aria.about": "About us",
      "aria.serviceSlides": "Service slides",
      "aria.certSlides": "Certification slides",

      "hero.titleHtml":
        'Precision at <span class="hero__accent">Altitude.</span><br />Safety at Heart.',
      "hero.lead":
        "Tree surgery and pruning for homes and estates across Ibiza — from tight villa gardens to storm-damaged trees. Safe work at height, done properly.",

      "about.p1Html":
        "Based in Ibiza, BaleArbol S.L. is an insured tree-cutting company offering <strong>tree surgery</strong>, <strong>forestry work</strong>, <strong>fire breaks</strong>, and <strong>storm damage call outs</strong>. From careful canopy work to urgent clearances after bad weather, we keep properties and landscapes safe across the island.",
      "about.p2":
        "Every job is planned around the site, the tree, and the people living nearby — so work is carried out cleanly, safely, and with as little disruption as possible. We take the time to walk the property, explain the options, and choose methods that protect both the canopy and surrounding structures. Whether you need routine maintenance, a managed clearance, or a rapid response after a storm, we are ready to assess the situation and get the right crew on the ground.",

      "services.title": "Our Services",
      "services.treeSurgery": "Tree Surgery",
      "services.treeSurgeryText":
        "Precision pruning, crown reduction, and sectional dismantling that protects tree health while keeping properties and canopies safe.",
      "services.forestry": "Forestry Work",
      "services.forestryText":
        "Managed thinning, clearance, and woodland maintenance for estates, rural sites, and larger forest stands.",
      "services.fireBreaks": "Fire Breaks",
      "services.fireBreaksText":
        "Strategic vegetation clearance and fire-break creation to reduce wildfire risk around homes, tracks, and boundaries.",
      "services.storm": "Storm Damage Call Outs",
      "services.stormText":
        "Rapid response for fallen, hung-up, or wind-damaged trees — made safe quickly with controlled rigging and removal.",

      "team.title": "Meet Your Crew",
      "team.role": "Founder & Lead Climber",

      "certs.title": "Insured & Certified in the Balearics",
      "certs.lead":
        "From liability cover to workplace safety training, we operate as a properly insured Ibiza company — ready for private gardens, rural estates, and municipal work across the islands.",
      "certs.protocol": "Safety First Protocol",
      "certs.insured": "Fully Insured Company",
      "certs.insuredText":
        "Public liability cover for every climb, clearance, and call-out — so your property is protected while we work.",
      "certs.crew": "Qualified Climbing Crew",
      "certs.crewText":
        "Trained arborists for technical tree surgery and rigging in tight Balearic sites, from villa gardens to hillside stands.",
      "certs.prl": "PRL Safety Training",
      "certs.prlText":
        "Ongoing prevención de riesgos laborales training so every ascent and chainsaw job follows Spanish workplace standards.",
      "certs.local": "Local Balearic Compliance",
      "certs.localText":
        "Familiar with island permits, fire-break requirements, and municipal rules for vegetation work across Ibiza and beyond.",

      "standards.titleHtml":
        'Our Balearic <span class="equipment__title-accent">Standards</span>',
      "standards.lead":
        "Island work means wind, fire risk, tight villa plots, and local rules. We plan every job around Balearic conditions — with the insurance, safety training, and site care expected on Ibiza and across the islands.",
      "standards.labelLiability": "Public Liability Cover",
      "standards.valueLiability": "Fully Insured",
      "standards.labelFire": "Fire-Break & Clearance",
      "standards.valueFire": "Island Protocols",
      "standards.labelSites": "Municipal & Estate Sites",
      "standards.valueSites": "Permit Ready",

      "gallery.title": "Follow us on Instagram",
      "gallery.loading": "Loading Instagram feed…",
      "gallery.empty": "No Instagram posts to show yet.",
      "gallery.unavailable":
        "Instagram feed is not connected yet. Add Instagram credentials in Vercel to enable it.",
      "gallery.error": "Could not load Instagram feed.",
      "gallery.justNow": "just now",
      "gallery.minuteAgo": "a minute ago",
      "gallery.minutesAgo": "{n} minutes ago",
      "gallery.hourAgo": "an hour ago",
      "gallery.hoursAgo": "{n} hours ago",
      "gallery.dayAgo": "a day ago",
      "gallery.daysAgo": "{n} days ago",
      "gallery.weekAgo": "a week ago",
      "gallery.weeksAgo": "{n} weeks ago",
      "gallery.monthAgo": "a month ago",
      "gallery.monthsAgo": "{n} months ago",
      "gallery.yearAgo": "a year ago",
      "gallery.yearsAgo": "{n} years ago",

      "cta.title": "Need help with your trees?",
      "cta.lead":
        "Send us a few details and photos of the site — we’ll get back to you, arrange a visit if needed, and talk through the best way to get the work done safely.",

      "footer.tagline":
        "Tree surgery and care across Ibiza — safe work at height for homes, villas, and estates since 2024.",
      "footer.location": "Ibiza, Balearics, Spain",
      "footer.emailPrefix": "email:",
      "footer.phonePrefix": "telf:",
      "footer.legal":
        "© 2026 Balearbol S.L. All rights reserved. Tree surgery & care in Ibiza.",

      "contact.title": "Contact Us",
      "contact.intro":
        "Use the form to request a quote and someone from our team will reach out and set a time to visit and discuss how we can help! We aim to respond within 24 hours.",
      "contact.name": "Client Name",
      "contact.namePh": "Full name or company",
      "contact.phone": "Phone Number",
      "contact.email": "Email Address",
      "contact.address": "Location Address",
      "contact.services": "What kinds of work do you need done?",
      "contact.issue": "Tell us more about what you need done",
      "contact.issuePh":
        "Describe the tree species, height, and specific issues (e.g., dead limb hanging over structure, storm damage)...",
      "contact.docs": "Tree Documentation",
      "contact.docsHint":
        "Upload high-resolution photos of the tree from multiple angles.",
      "contact.upload": "Upload Images",
      "contact.uploadAria": "Upload images",
      "contact.uploadMeta": "Max 50MB per file. Formats: JPG, PNG, HEIC.",
      "contact.submit": "Submit Request",
      "contact.submitting": "Submitting…",
      "contact.emergencyTitle": "Emergency Dispatch",
      "contact.emergencyText":
        "For immediate hazards following storm events or imminent structural failure, contact us on.",
      "contact.errServices": "Please select at least one type of work.",
      "contact.errPhotos": "Please upload at least one photo of the tree or site.",
      "contact.errCaptchaConfig":
        "Captcha is not configured yet. Add your Turnstile site key.",
      "contact.errCaptcha": "Please complete the captcha before submitting.",
      "contact.errSubmit": "Could not submit your request. Please try again.",
      "contact.errGeneric": "Something went wrong.",
      "contact.errImageOnly": "Only image files are allowed (JPG, PNG, HEIC).",
      "contact.errFileSize": "{name} is over 50MB.",
      "contact.errMaxFiles": "You can upload up to {n} images.",
      "contact.success":
        "Thanks — we’ve got your request. We’ll take a look at the details and get back to you soon.",
    },

    es: {
      "meta.homeTitle": "Cirugía de árboles y arboricultura en Ibiza | Balearbol",
      "meta.homeDesc":
        "Cirugía de árboles, trabajos forestales, cortafuegos y emergencias por tormentas en Ibiza y Baleares. Trabajo seguro en altura por Balearbol S.L.",
      "meta.contactTitle": "Pedir presupuesto | Cirugía de árboles Ibiza | Balearbol",
      "meta.contactDesc":
        "Pide presupuesto a Balearbol para cirugía de árboles, cortafuegos o daños por tormenta en Ibiza. Llama al +34 620 059 167 para emergencias.",

      "nav.home": "Inicio",
      "nav.about": "Nosotros",
      "nav.services": "Servicios",
      "nav.team": "Equipo",
      "nav.safety": "Seguridad",
      "nav.gallery": "Galería",
      "nav.contact": "Contacto",
      "nav.quote": "Pedir presupuesto",
      "nav.openMenu": "Abrir menú",
      "nav.closeMenu": "Cerrar menú",
      "nav.primary": "Principal",
      "nav.mobile": "Móvil",
      "nav.footer": "Pie de página",
      "nav.language": "Idioma",

      "topbar.emergency": "Emergencias:",
      "aria.instagram": "Balearbol en Instagram",
      "aria.facebook": "Balearbol en Facebook",
      "aria.maps": "Abrir Ibiza en Google Maps",
      "aria.hero": "Introducción",
      "aria.about": "Sobre nosotros",
      "aria.serviceSlides": "Diapositivas de servicios",
      "aria.certSlides": "Diapositivas de certificaciones",

      "hero.titleHtml":
        'Precisión en <span class="hero__accent">altura.</span><br />Seguridad de corazón.',
      "hero.lead":
        "Cirugía de árboles y poda para viviendas y fincas en Ibiza — desde jardines de villas hasta árboles dañados por tormentas. Trabajo seguro en altura, bien hecho.",

      "about.p1Html":
        "Con sede en Ibiza, BaleArbol S.L. es una empresa asegurada de tala y poda que ofrece <strong>cirugía de árboles</strong>, <strong>trabajos forestales</strong>, <strong>cortafuegos</strong> y <strong>emergencias por tormentas</strong>. Desde el cuidado cuidadoso de la copa hasta despejes urgentes tras el mal tiempo, mantenemos seguras propiedades y paisajes en toda la isla.",
      "about.p2":
        "Cada trabajo se planifica según el terreno, el árbol y las personas que viven cerca — para hacerlo limpio, seguro y con la menor molestia posible. Recorremos la propiedad, explicamos las opciones y elegimos métodos que protegen la copa y las estructuras. Tanto si necesitas mantenimiento rutinario, un despeje planificado o una respuesta rápida tras una tormenta, estamos listos para valorar la situación y enviar al equipo adecuado.",

      "services.title": "Nuestros servicios",
      "services.treeSurgery": "Cirugía de árboles",
      "services.treeSurgeryText":
        "Poda de precisión, reducción de copa y desmontaje por secciones que protege la salud del árbol y la seguridad de la propiedad.",
      "services.forestry": "Trabajos forestales",
      "services.forestryText":
        "Clareo, despeje y mantenimiento de bosques para fincas, zonas rurales y masas forestales mayores.",
      "services.fireBreaks": "Cortafuegos",
      "services.fireBreaksText":
        "Desbroce estratégico y creación de cortafuegos para reducir el riesgo de incendio alrededor de viviendas, caminos y límites.",
      "services.storm": "Emergencias por tormentas",
      "services.stormText":
        "Respuesta rápida a árboles caídos, enganchados o dañados por el viento — asegurados con rapidez mediante rigging y retirada controlada.",

      "team.title": "Conoce al equipo",
      "team.role": "Fundador y trepador principal",

      "certs.title": "Asegurados y certificados en Baleares",
      "certs.lead":
        "Desde la cobertura de responsabilidad hasta la formación en seguridad laboral, operamos como empresa asegurada de Ibiza — preparados para jardines privados, fincas rurales y trabajos municipales en las islas.",
      "certs.protocol": "Protocolo seguridad primero",
      "certs.insured": "Empresa totalmente asegurada",
      "certs.insuredText":
        "Cobertura de responsabilidad civil en cada trepa, despeje y salida — para que tu propiedad esté protegida mientras trabajamos.",
      "certs.crew": "Equipo de trepa cualificado",
      "certs.crewText":
        "Arboristas formados en cirugía técnica y rigging en espacios estrechos de Baleares, desde villas hasta laderas.",
      "certs.prl": "Formación PRL",
      "certs.prlText":
        "Formación continua en prevención de riesgos laborales para que cada ascenso y trabajo con motosierra cumpla la normativa española.",
      "certs.local": "Cumplimiento local balear",
      "certs.localText":
        "Conocemos permisos insulares, requisitos de cortafuegos y normas municipales de vegetación en Ibiza y más allá.",

      "standards.titleHtml":
        'Nuestros estándares <span class="equipment__title-accent">baleares</span>',
      "standards.lead":
        "Trabajar en las islas implica viento, riesgo de incendio, parcelas estrechas y normas locales. Planificamos cada trabajo según las condiciones baleares — con el seguro, la formación y el cuidado del entorno que se espera en Ibiza y el resto de islas.",
      "standards.labelLiability": "Responsabilidad civil",
      "standards.valueLiability": "Totalmente asegurados",
      "standards.labelFire": "Cortafuegos y despeje",
      "standards.valueFire": "Protocolos insulares",
      "standards.labelSites": "Obras municipales y fincas",
      "standards.valueSites": "Listos para permisos",

      "gallery.title": "Síguenos en Instagram",
      "gallery.loading": "Cargando el feed de Instagram…",
      "gallery.empty": "Aún no hay publicaciones de Instagram.",
      "gallery.unavailable":
        "El feed de Instagram aún no está conectado. Añade las credenciales en Vercel para activarlo.",
      "gallery.error": "No se pudo cargar el feed de Instagram.",
      "gallery.justNow": "ahora mismo",
      "gallery.minuteAgo": "hace un minuto",
      "gallery.minutesAgo": "hace {n} minutos",
      "gallery.hourAgo": "hace una hora",
      "gallery.hoursAgo": "hace {n} horas",
      "gallery.dayAgo": "hace un día",
      "gallery.daysAgo": "hace {n} días",
      "gallery.weekAgo": "hace una semana",
      "gallery.weeksAgo": "hace {n} semanas",
      "gallery.monthAgo": "hace un mes",
      "gallery.monthsAgo": "hace {n} meses",
      "gallery.yearAgo": "hace un año",
      "gallery.yearsAgo": "hace {n} años",

      "cta.title": "¿Necesitas ayuda con tus árboles?",
      "cta.lead":
        "Envíanos unos detalles y fotos del lugar — te responderemos, acordaremos una visita si hace falta y veremos la mejor forma de hacer el trabajo con seguridad.",

      "footer.tagline":
        "Cirugía de árboles y cuidado en Ibiza — trabajo seguro en altura para hogares, villas y fincas desde 2024.",
      "footer.location": "Ibiza, Baleares, España",
      "footer.emailPrefix": "email:",
      "footer.phonePrefix": "tél:",
      "footer.legal":
        "© 2026 Balearbol S.L. Todos los derechos reservados. Cirugía y cuidado de árboles en Ibiza.",

      "contact.title": "Contacto",
      "contact.intro":
        "Usa el formulario para pedir presupuesto y alguien de nuestro equipo te contactará para concertar una visita y hablar de cómo podemos ayudarte. Respondemos en un plazo de 24 horas.",
      "contact.name": "Nombre del cliente",
      "contact.namePh": "Nombre completo o empresa",
      "contact.phone": "Teléfono",
      "contact.email": "Correo electrónico",
      "contact.address": "Dirección",
      "contact.services": "¿Qué tipo de trabajo necesitas?",
      "contact.issue": "Cuéntanos más sobre lo que necesitas",
      "contact.issuePh":
        "Describe la especie, la altura y los problemas concretos (p. ej. rama muerta sobre una estructura, daños por tormenta)...",
      "contact.docs": "Documentación del árbol",
      "contact.docsHint":
        "Sube fotos en alta resolución del árbol desde varios ángulos.",
      "contact.upload": "Subir imágenes",
      "contact.uploadAria": "Subir imágenes",
      "contact.uploadMeta": "Máx. 50 MB por archivo. Formatos: JPG, PNG, HEIC.",
      "contact.submit": "Enviar solicitud",
      "contact.submitting": "Enviando…",
      "contact.emergencyTitle": "Emergencias",
      "contact.emergencyText":
        "Para riesgos inmediatos tras tormentas o riesgo inminente de fallo estructural, contáctanos en.",
      "contact.errServices": "Selecciona al menos un tipo de trabajo.",
      "contact.errPhotos": "Sube al menos una foto del árbol o del lugar.",
      "contact.errCaptchaConfig":
        "El captcha aún no está configurado. Añade tu clave de Turnstile.",
      "contact.errCaptcha": "Completa el captcha antes de enviar.",
      "contact.errSubmit": "No se pudo enviar la solicitud. Inténtalo de nuevo.",
      "contact.errGeneric": "Algo salió mal.",
      "contact.errImageOnly": "Solo se permiten imágenes (JPG, PNG, HEIC).",
      "contact.errFileSize": "{name} supera los 50 MB.",
      "contact.errMaxFiles": "Puedes subir hasta {n} imágenes.",
      "contact.success":
        "Gracias — hemos recibido tu solicitud. Revisaremos los detalles y te contactaremos pronto.",
    },

    de: {
      "meta.homeTitle": "Baumpflege & Arboristik auf Ibiza | Balearbol",
      "meta.homeDesc":
        "Versicherte Baumpflege, Forstarbeiten, Brandschneisen und Sturmeinsätze auf Ibiza und den Balearen. Sichere Arbeit in der Höhe von Balearbol S.L.",
      "meta.contactTitle": "Angebot anfordern | Baumpflege Ibiza | Balearbol",
      "meta.contactDesc":
        "Fordere ein Angebot von Balearbol für Baumpflege, Brandschneisen oder Sturmschäden auf Ibiza an. Notruf: +34 620 059 167.",

      "nav.home": "Start",
      "nav.about": "Über uns",
      "nav.services": "Leistungen",
      "nav.team": "Team",
      "nav.safety": "Sicherheit",
      "nav.gallery": "Galerie",
      "nav.contact": "Kontakt",
      "nav.quote": "Angebot anfordern",
      "nav.openMenu": "Menü öffnen",
      "nav.closeMenu": "Menü schließen",
      "nav.primary": "Hauptnavigation",
      "nav.mobile": "Mobilnavigation",
      "nav.footer": "Fußzeile",
      "nav.language": "Sprache",

      "topbar.emergency": "Notruf:",
      "aria.instagram": "Balearbol auf Instagram",
      "aria.facebook": "Balearbol auf Facebook",
      "aria.maps": "Ibiza in Google Maps öffnen",
      "aria.hero": "Einführung",
      "aria.about": "Über uns",
      "aria.serviceSlides": "Leistungs-Slides",
      "aria.certSlides": "Zertifizierungs-Slides",

      "hero.titleHtml":
        'Präzision in der <span class="hero__accent">Höhe.</span><br />Sicherheit im Fokus.',
      "hero.lead":
        "Baumpflege und Schnitt für Häuser und Anwesen auf Ibiza — von engen Villengärten bis zu sturmgeschädigten Bäumen. Sichere Arbeit in der Höhe, ordentlich gemacht.",

      "about.p1Html":
        "Mit Sitz auf Ibiza ist BaleArbol S.L. ein versichertes Baumpflegeunternehmen für <strong>Baumschnitt</strong>, <strong>Forstarbeiten</strong>, <strong>Brandschneisen</strong> und <strong>Sturmeinsätze</strong>. Von sorgfältiger Kronenpflege bis zu dringenden Freimachungen nach Unwetter halten wir Grundstücke und Landschaften auf der Insel sicher.",
      "about.p2":
        "Jeder Auftrag wird um Standort, Baum und die Menschen vor Ort geplant — sauber, sicher und mit möglichst wenig Störung. Wir gehen das Grundstück ab, erklären die Optionen und wählen Methoden, die Krone und umliegende Strukturen schützen. Ob Routinepflege, geplante Freimachung oder schnelle Hilfe nach einem Sturm: Wir bewerten die Lage und bringen das passende Team vor Ort.",

      "services.title": "Unsere Leistungen",
      "services.treeSurgery": "Baumpflege",
      "services.treeSurgeryText":
        "Präziser Schnitt, Kronenreduktion und abschnittsweiser Abbau, der die Baumgesundheit schützt und Grundstück sowie Kronen sicher hält.",
      "services.forestry": "Forstarbeiten",
      "services.forestryText":
        "Durchforstung, Freimachung und Waldpflege für Anwesen, ländliche Flächen und größere Bestände.",
      "services.fireBreaks": "Brandschneisen",
      "services.fireBreaksText":
        "Strategische Vegetationsfreimachung und Brandschneisen, um das Brandrisiko um Häuser, Wege und Grenzen zu senken.",
      "services.storm": "Sturmeinsätze",
      "services.stormText":
        "Schnelle Hilfe bei umgestürzten, hängenden oder windgeschädigten Bäumen — rasch gesichert mit kontrolliertem Rigging und Entfernung.",

      "team.title": "Dein Team",
      "team.role": "Gründer & Lead Climber",

      "certs.title": "Versichert & zertifiziert auf den Balearen",
      "certs.lead":
        "Von der Haftpflicht bis zur Arbeitssicherheit arbeiten wir als versichertes Unternehmen auf Ibiza — bereit für Privatgärten, Landgüter und kommunale Aufträge auf den Inseln.",
      "certs.protocol": "Safety-First-Protokoll",
      "certs.insured": "Vollständig versichert",
      "certs.insuredText":
        "Öffentliche Haftpflicht für jede Besteigung, Freimachung und jeden Einsatz — damit dein Grundstück während der Arbeit geschützt ist.",
      "certs.crew": "Qualifiziertes Kletterteam",
      "certs.crewText":
        "Ausgebildete Arboristen für technische Baumpflege und Rigging auf engen balearischen Standorten — von Villengärten bis Hanglagen.",
      "certs.prl": "PRL-Sicherheitsschulung",
      "certs.prlText":
        "Laufende Schulung zur Prävention von Arbeitsrisiken, damit jede Besteigung und jeder Kettensägeneinsatz spanischen Standards folgt.",
      "certs.local": "Lokale balearische Vorgaben",
      "certs.localText":
        "Vertraut mit Inselgenehmigungen, Brandschneisen-Anforderungen und kommunalen Regeln für Vegetationsarbeiten auf Ibiza und darüber hinaus.",

      "standards.titleHtml":
        'Unsere balearischen <span class="equipment__title-accent">Standards</span>',
      "standards.lead":
        "Inselarbeit heißt Wind, Brandrisiko, enge Villengrundstücke und lokale Regeln. Wir planen jeden Auftrag um balearische Bedingungen — mit Versicherung, Sicherheitsschulung und der Sorgfalt, die auf Ibiza und den Inseln erwartet wird.",
      "standards.labelLiability": "Haftpflichtschutz",
      "standards.valueLiability": "Voll versichert",
      "standards.labelFire": "Brandschneise & Freimachung",
      "standards.valueFire": "Inselprotokolle",
      "standards.labelSites": "Kommunale & Estate-Flächen",
      "standards.valueSites": "Genehmigungsbereit",

      "gallery.title": "Folge uns auf Instagram",
      "gallery.loading": "Instagram-Feed wird geladen…",
      "gallery.empty": "Noch keine Instagram-Beiträge.",
      "gallery.unavailable":
        "Instagram-Feed ist noch nicht verbunden. Füge die Zugangsdaten in Vercel hinzu.",
      "gallery.error": "Instagram-Feed konnte nicht geladen werden.",
      "gallery.justNow": "gerade eben",
      "gallery.minuteAgo": "vor einer Minute",
      "gallery.minutesAgo": "vor {n} Minuten",
      "gallery.hourAgo": "vor einer Stunde",
      "gallery.hoursAgo": "vor {n} Stunden",
      "gallery.dayAgo": "vor einem Tag",
      "gallery.daysAgo": "vor {n} Tagen",
      "gallery.weekAgo": "vor einer Woche",
      "gallery.weeksAgo": "vor {n} Wochen",
      "gallery.monthAgo": "vor einem Monat",
      "gallery.monthsAgo": "vor {n} Monaten",
      "gallery.yearAgo": "vor einem Jahr",
      "gallery.yearsAgo": "vor {n} Jahren",

      "cta.title": "Brauchst du Hilfe mit deinen Bäumen?",
      "cta.lead":
        "Schick uns ein paar Details und Fotos vom Standort — wir melden uns, vereinbaren bei Bedarf einen Besuch und besprechen den sichersten Weg für die Arbeit.",

      "footer.tagline":
        "Baumpflege auf Ibiza — sichere Arbeit in der Höhe für Häuser, Villen und Anwesen seit 2024.",
      "footer.location": "Ibiza, Balearen, Spanien",
      "footer.emailPrefix": "E-Mail:",
      "footer.phonePrefix": "Tel:",
      "footer.legal":
        "© 2026 Balearbol S.L. Alle Rechte vorbehalten. Baumpflege auf Ibiza.",

      "contact.title": "Kontakt",
      "contact.intro":
        "Nutze das Formular für eine Angebotsanfrage — jemand aus unserem Team meldet sich und vereinbart einen Besuch, um zu besprechen, wie wir helfen können. Wir antworten in der Regel innerhalb von 24 Stunden.",
      "contact.name": "Kundenname",
      "contact.namePh": "Vollständiger Name oder Firma",
      "contact.phone": "Telefonnummer",
      "contact.email": "E-Mail-Adresse",
      "contact.address": "Adresse",
      "contact.services": "Welche Arbeiten werden benötigt?",
      "contact.issue": "Erzähl uns mehr über den Auftrag",
      "contact.issuePh":
        "Beschreibe Baumart, Höhe und konkrete Probleme (z. B. toter Ast über Gebäude, Sturmschaden)...",
      "contact.docs": "Baumdokumentation",
      "contact.docsHint":
        "Lade hochauflösende Fotos des Baums aus mehreren Winkeln hoch.",
      "contact.upload": "Bilder hochladen",
      "contact.uploadAria": "Bilder hochladen",
      "contact.uploadMeta": "Max. 50 MB pro Datei. Formate: JPG, PNG, HEIC.",
      "contact.submit": "Anfrage senden",
      "contact.submitting": "Wird gesendet…",
      "contact.emergencyTitle": "Notruf",
      "contact.emergencyText":
        "Bei unmittelbaren Gefahren nach Stürmen oder drohendem Strukturversagen erreichst du uns unter.",
      "contact.errServices": "Bitte wähle mindestens eine Arbeitsart.",
      "contact.errPhotos": "Bitte lade mindestens ein Foto vom Baum oder Standort hoch.",
      "contact.errCaptchaConfig":
        "Captcha ist noch nicht konfiguriert. Füge deinen Turnstile-Site-Key hinzu.",
      "contact.errCaptcha": "Bitte Captcha vor dem Absenden ausfüllen.",
      "contact.errSubmit": "Anfrage konnte nicht gesendet werden. Bitte erneut versuchen.",
      "contact.errGeneric": "Etwas ist schiefgelaufen.",
      "contact.errImageOnly": "Nur Bilddateien erlaubt (JPG, PNG, HEIC).",
      "contact.errFileSize": "{name} ist größer als 50 MB.",
      "contact.errMaxFiles": "Du kannst bis zu {n} Bilder hochladen.",
      "contact.success":
        "Danke — wir haben deine Anfrage erhalten. Wir prüfen die Details und melden uns bald.",
    },
  };

  let currentLang = "en";

  const t = (key, vars) => {
    const table = strings[currentLang] || strings.en;
    let value = table[key] ?? strings.en[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([name, val]) => {
        value = value.replace(new RegExp(`\\{${name}\\}`, "g"), String(val));
      });
    }
    return value;
  };

  const apply = (lang) => {
    if (!SUPPORTED.includes(lang)) lang = "en";
    currentLang = lang;
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.setAttribute("placeholder", t(key));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      el.setAttribute("aria-label", t(key));
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (!key) return;
      document.title = t(key);
    });

    document.querySelectorAll("[data-i18n-meta]").forEach((el) => {
      const key = el.getAttribute("data-i18n-meta");
      if (!key) return;
      el.setAttribute("content", t(key));
    });

    document.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const menuToggle = document.querySelector("[data-menu-toggle]");
    if (menuToggle) {
      const open = document.querySelector("[data-site-header]")?.classList.contains("is-open");
      menuToggle.setAttribute("aria-label", t(open ? "nav.closeMenu" : "nav.openMenu"));
    }

    document.dispatchEvent(new CustomEvent("balearbol:langchange", { detail: { lang } }));
  };

  const detect = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {
      /* ignore */
    }
    const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : "en";
  };

  const init = () => {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.getAttribute("data-lang");
        if (lang) apply(lang);
      });
    });
    apply(detect());
  };

  window.BALEARBOL_I18N = { t, apply, init, get lang() { return currentLang; } };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
