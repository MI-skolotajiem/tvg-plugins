(() => {
  const panel = document.querySelector('#setup-assistant');
  const text = document.querySelector('#setup-prompt');
  const status = document.querySelector('#setup-status');
  for (const link of document.querySelectorAll('[data-plugin-download]')) {
    link.addEventListener('click', () => {
      panel.open = true;
      status.textContent = 'Lejupielāde pieprasīta. Varat nokopēt uzdevumu un ielīmēt to Codex sarunā.';
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  document.querySelector('#copy-setup').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Nokopēts! Ielīmējiet Codex sarunā ar lokālo piekļuvi.';
    } catch {
      panel.open = true;
      text.focus();
      text.select();
      status.textContent = 'Teksts atlasīts. Nokopējiet ar Ctrl+C vai ierīces kopēšanas izvēlni.';
    }
  });
})();
