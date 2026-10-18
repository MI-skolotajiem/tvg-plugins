(() => {
  const text = document.querySelector('#refresh-text');
  const status = document.querySelector('#refresh-status');
  document.querySelector('#copy-refresh').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Nokopēts! Ielīmējiet tajā ChatGPT sarunā, kurā vēlaties atjaunot instrukcijas.';
    } catch {
      document.querySelector('#refresh-details').open = true;
      text.focus();
      text.select();
      status.textContent = 'Teksts atlasīts. Nokopējiet ar Ctrl+C vai ierīces kopēšanas izvēlni.';
    }
  });
})();
