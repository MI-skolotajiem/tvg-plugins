# TVG MI prasmju bibliotēka

Šis ir privātais, centrālais prasmju avots. Katru prasmi uzturam vienā `skills/<nosaukums>/SKILL.md` failā.

## Publicētā vietne

Paredzētā adrese (ja GitHub Pages tiek iespējots): https://mi-skolotajiem.github.io/tvg-plugins/

- `skills/prezentacijas-veidosana/SKILL.md` — pirmā prasme.
- `site/index.html` — skolotājiem paredzētais katalogs un poga **Kopēt instrukciju ChatGPT**.
- `.github/workflows/pages.yml` — automātiski publicē vietni, kad mainīts prasmes vai vietnes saturs.

## Vienreizēja aktivizācija

GitHub atveriet **Settings → Pages → Build and deployment → Source: GitHub Actions**.

**Svarīgi:** privāta repozitorija GitHub Pages atbalsts ir atkarīgs no GitHub abonementa. GitHub Free gadījumā šis publicēšanas variants no privāta avota nav pieejams; tad var izveidot atsevišķu publisku publicēšanas repozitoriju, saglabājot šo privātu, un konfigurēt drošu publicēšanas piekļuvi.

Pat ja avota repozitorijs ir privāts, GitHub Pages vietne var būt **publiska**; tajā nedrīkst publicēt sensitīvu informāciju.

## Darbība

1. Rediģējiet vajadzīgās prasmes `SKILL.md` failu un saglabājiet izmaiņas `main` zarā.
2. GitHub Actions automātiski sagatavos publicējamu kopiju, kurā iekļauti tikai `site/index.html` un konkrētās prasmes `SKILL.md`.
3. Skolotāji vietnē nokopēs aktuālo instrukciju un ielīmēs to ChatGPT.

Šis risinājums **neinstalē** un **automātiski neatjaunina** prasmi skolotāju ChatGPT kontos; tas atjaunina publicēto instrukciju un atvieglo tās izmantošanu.
