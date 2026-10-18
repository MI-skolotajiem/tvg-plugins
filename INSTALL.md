# TVĢ komplekts Codex lietotnei — izmēģinājums

Komplektā: darba lapas, diferenciācija un prezentāciju veidošana. Lietotājam vajadzīga Codex lietotne un savs konts; GitHub konts publiskā repozitorija lasīšanai nav vajadzīgs. Parastā ChatGPT tīmekļa sarunā šis uzstādītājs prasmes neinstalē.

## Windows: vienreizēja uzstādīšana

1. Uzstādiet Codex un pieslēdzieties savam kontam.
2. Lejupielādējiet šo repozitoriju kā ZIP un izpakojiet.
3. Atveriet `scripts/install-tvg.cmd` ar dubultklikšķi. Varat arī atvērt Windows PowerShell izpakotajā mapē un palaist:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-tvg.ps1
```

Uzstādītājs pievieno tikai TVĢ instalēšanas avotu un spraudni. Pēc instalēšanas atveriet jaunu Codex sarunu. Prasmes var tikt izvēlētas pēc parasta pieprasījuma, piemēram, “Izveido darba lapu 7. klasei”; to nosaukumi nav obligāti jāraksta. Automātiska izvēle ir atkarīga no uzdevuma atbilstības prasmes aprakstam.

Uzstādītājs arī izveido Windows uzdevumu `TVG-Codex-Update`: pārbaude katru dienu plkst. 12.00 pēc datora vietējā laika, vai vēlāk, kad dators pieejams. Tas darbojas ar pašreizējā Windows lietotāja tiesībām, kad lietotājs ir pierakstījies, un prasa internetu. Administratora tiesības netiek pieprasītas. Skolas Windows politika var neļaut izveidot šo uzdevumu; tādā gadījumā skripts ziņo par kļūdu, lai gan pats spraudnis jau var būt uzstādīts.

Lai uzstādītu bez fona pārbaudēm, pievienojiet `-NoAutoUpdate`.

Uzdevuma skripts un pēdējās pārbaudes rezultāts glabājas Codex datu mapē `tvg-update` (parasti `%USERPROFILE%\.codex\tvg-update`). Jauns prasmju saturs var prasīt jaunu sarunu vai Codex pārstartēšanu; jau atvērtās sarunas netiek piespiedu kārtā mainītas.

## Pārbaudes versija pirms apvienošanas ar main

Ja faili atrodas izmēģinājuma zarā, uzstādītājam norādiet `-Ref tvg-plugin-pilot`. Pēc apvienošanas ar `main` pārslēdziet avotu:

```powershell
codex plugin marketplace add https://github.com/MI-skolotajiem/tvg-plugins.git --ref main
codex plugin marketplace upgrade tvg-skolotajiem
codex plugin add tvg@tvg-skolotajiem
```

## Atjaunināšana autoram

Prasmju vienīgais avots paliek `skills/<nosaukums>/SKILL.md`. Katrā publicējamā izmaiņā palieliniet `plugin.json` versiju (piemēram, `0.1.0` → `0.1.1`). Saglabājiet izmaiņas sekotajā zarā. Atjauninātājs izmanto Codex komandas `plugin marketplace upgrade` un `plugin add`; tas nepārkopē failus manuāli lietotāja personīgo prasmju mapē.

Manuāla pārbaude:

```powershell
codex plugin marketplace upgrade tvg-skolotajiem
codex plugin add tvg@tvg-skolotajiem
```

## Atinstalēšana

```powershell
Unregister-ScheduledTask -TaskName TVG-Codex-Update -Confirm:$false -ErrorAction SilentlyContinue
codex plugin remove tvg@tvg-skolotajiem
codex plugin marketplace remove tvg-skolotajiem
```

Ja datorā jau ir tāda paša nosaukuma personīgās prasmes, tās netiek dzēstas. Codex var parādīt abas kopijas; pārbaudes laikā pārliecinieties, ka izvēlēta prasme no TVĢ spraudņa.

Šis ir izmēģinājuma laidiens. Lokāla uzstādīšana, Git avota atjaunināšana un Windows fona uzdevums ir atsevišķas pārbaudes; par to faktisko izpildi ziņo izmēģinājuma rezultāti.
