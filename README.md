# TVĢ MI prasmju bibliotēka

Publisks prasmju avots skolotājiem: https://mi-skolotajiem.github.io/tvg-plugins/

## Skolotājam

Vietnē izvēlieties **Lejupielādēt TVĢ spraudni**, izpakojiet ZIP un palaidiet `install-tvg.cmd`. Vajadzīga Windows Codex lietotne un savs konts; GitHub konts nav vajadzīgs. Pilna instrukcija: https://mi-skolotajiem.github.io/tvg-plugins/uzstadisana.html

Uzstādītājs instalē spraudni no šī repo `main` zara un izveido Windows uzdevumu `TVG-Codex-Update`. Tas reizi dienā pārbauda avotu un atjauno instalēto saturu. Datoram jābūt pieejamam, lietotājam pierakstītam un internetam ieslēgtam. Ja skolas datora politika bloķē uzdevuma izveidi, fona atjaunināšana nav ieslēgta. Uzdevuma reālā darbība vēl jāapstiprina parastā Windows sesijā; Codex ierobežotajā izpildvidē CIM piekļuve ir bloķēta.

Parastā ChatGPT pārlūka sarunā šo spraudni nevar instalēt. Vietnē saglabātas atsevišķu instrukciju kopēšanas pogas šādiem lietotājiem.

## Autoram

- Vienīgais prasmju avots: `skills/<nosaukums>/SKILL.md`.
- Spraudnis: `plugin.json`; katalogs: `.agents/plugins/marketplace.json`.
- Uzstādītājs un atjauninātājs: `scripts/install-tvg.ps1`.
- Publicējot izmaiņas `main`, GitHub Pages darbplūsma atjauno vietni un no aktuālajiem skriptiem izveido lejupielādējamo ZIP. ZIP nav jāaugšupielādē ar roku.
- Atjauninātājs izpilda `codex plugin marketplace upgrade tvg-skolotajiem` un `codex plugin add tvg@tvg-skolotajiem`. Codex CLI 0.154.0 pārbaudē atkārtota instalēšana atjaunoja prasmes saturu arī ar nemainīgu spraudņa versiju. Versiju ieteicams palielināt nozīmīgiem laidieniem.
- Jauna prasme jaunā `skills/` apakšmapē iekļaujas spraudnī; lai tai būtu sava kartīte vietnē, atjaunojiet `site/index.html`.

Instalēšanas plānotā uzdevuma skripts un pārbaudes rezultāts glabājas Codex datu mapē `tvg-update`. Jauns instrukciju saturs var prasīt jaunu sarunu vai lietotnes pārstartēšanu. Uzstādīšana nepārraksta lietotāja personīgās prasmes.
