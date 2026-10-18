(() => {
  const skills = [
    { name: 'darbalapa', path: './skills/darbalapa/SKILL.md' },
    { name: 'diferenciacija', path: './skills/diferenciacija/SKILL.md' },
    { name: 'prezentacijas-veidosana', path: './skills/prezentacijas-veidosana/SKILL.md' }
  ];
  const button = document.querySelector('#copy-starter');
  const status = document.querySelector('#status-starter');
  const text = document.querySelector('#starter-text');
  const details = document.querySelector('#starter-details');

  async function prepare() {
    button.disabled = true;
    status.classList.remove('error');
    status.textContent = 'Sagatavo aktuālās prasmes…';
    try {
      const loaded = await Promise.all(skills.map(async skill => {
        const response = await fetch(skill.path, { cache: 'no-store' });
        if (!response.ok) throw new Error(skill.name + ': HTTP ' + response.status);
        const content = await response.text();
        if (!content.trim().startsWith('---') || !content.includes('description:')) {
          throw new Error(skill.name + ': nederīgs prasmju fails');
        }
        return { ...skill, content, url: new URL(skill.path, document.baseURI).href };
      }));
      text.value = [
        'Lūdzu, šajā sarunā izmanto tālāk pievienotās TVĢ mācību materiālu veidošanas instrukcijas.',
        'Izvēlies uzdevumam atbilstošo prasmi pēc tās apraksta; ja vajadzīgs, apvieno vairākas. Man nav katru reizi jāraksta prasmes nosaukums vai komanda.',
        'Šis teksts satur pilnās instrukcijas, tāpēc to sākotnējai izmantošanai nav jāatver saites. Strādā latviešu valodā. Ja uzdevums jau pievienots, sāc to izpildīt; ja trūkst būtiskas informācijas, uzdod vienu īsu, apvienotu jautājumu.',
        'Ja mans uzdevums vēl nav norādīts, īsi paziņo, ka šīs sarunas instrukcijas ir saņemtas, un aicini norādīt klasi, tematu un vēlamo materiālu.',
        'Tās ir šīs sarunas darba norādes, nevis kontā instalēts spraudnis. Neapgalvo, ka kaut kas ir pastāvīgi instalēts vai ka nākotnes izmaiņas ielādēsies automātiski.',
        'Ja vēlāk lūdzu atjaunināt instrukcijas un vari atvērt internetu, nolasi aktuālo saturu no norādītajiem avotiem. Ja nevari, aicini vēlreiz nokopēt sākuma promptu no vietnes. Neapgalvo, ka faili ir nolasīti vai izveidoti, ja tas nav izdarīts.',
        'Vietne: ' + new URL('./', document.baseURI).href,
        ...loaded.map(skill => '\n===== PRASME: ' + skill.name + ' =====\nAvots: ' + skill.url + '\n\n' + skill.content + '\n===== PRASMES BEIGAS ====='),
        '\nMans uzdevums: [šeit varu ierakstīt uzdevumu vai nosūtīt to nākamajā ziņā]'
      ].join('\n\n');
      button.disabled = false;
      button.textContent = 'Kopēt visu TVĢ sākuma promptu';
      status.textContent = 'Visas 3 prasmes gatavas kopēšanai';
    } catch {
      text.value = '';
      button.disabled = false;
      button.textContent = 'Mēģināt ielādēt vēlreiz';
      status.textContent = 'Neizdevās ielādēt visu komplektu. Mēģiniet vēlreiz vai kopējiet atsevišķu prasmi zemāk.';
      status.classList.add('error');
    }
  }

  button.addEventListener('click', async () => {
    if (!text.value) { await prepare(); return; }
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Nokopēts! Ielīmējiet ChatGPT un pievienojiet savu uzdevumu.';
    } catch {
      details.open = true;
      text.focus();
      text.select();
      status.textContent = 'Teksts atlasīts. Nokopējiet ar Ctrl+C vai ierīces kopēšanas izvēlni.';
    }
  });

  prepare();
})();
