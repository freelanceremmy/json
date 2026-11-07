const inputEl = document.getElementById('input');
  const outputEl = document.getElementById('output');
  const statusEl = document.getElementById('status');
  const statsEl = document.getElementById('stats');
  const indentEl = document.getElementById('indent');

  function getIndent() {
    if (indentEl.value === 'tab') return '\t';
    return parseInt(indentEl.value);
  }

  function showStatus(msg, isError) {
    statusEl.textContent = msg;
    statusEl.className = isError ? 'error' : 'success';
    statusEl.style.display = 'block';
  }

  function updateStats(text) {
    statsEl.textContent = `Characters: ${text.length} | Lines: ${text.split('\n').length}`;
  }

  function formatJSON() {
    const raw = inputEl.value.trim();
    if (!raw) { showStatus('Paste some JSON first!', true); return; }
    try {
      const parsed = JSON.parse(raw);
      const pretty = JSON.stringify(parsed, null, getIndent());
      outputEl.value = pretty;
      updateStats(pretty);
      showStatus('✅ Valid JSON! Formatted successfully.', false);
    } catch (e) {
      outputEl.value = '';
      showStatus('❌ Invalid JSON: ' + e.message, true);
    }
  }

  function minifyJSON() {
    const raw = inputEl.value.trim();
    if (!raw) { showStatus('Paste some JSON first!', true); return; }
    try {
      const parsed = JSON.parse(raw);
      const min = JSON.stringify(parsed);
      outputEl.value = min;
      updateStats(min);
      showStatus('✅ Minified! All spaces removed.', false);
    } catch (e) {
      showStatus('❌ Invalid JSON: ' + e.message, true);
    }
  }

  function validateJSON() {
    const raw = inputEl.value.trim();
    if (!raw) { showStatus('Paste some JSON first!', true); return; }
    try {
      JSON.parse(raw);
      showStatus('✅ This JSON is valid!', false);
    } catch (e) {
      showStatus('❌ Invalid JSON: ' + e.message, true);
    }
  }

  function copyOutput() {
    if (!outputEl.value) { showStatus('Nothing to copy yet!', true); return; }
    navigator.clipboard.writeText(outputEl.value).then(() => {
      showStatus('✅ Copied to clipboard!', false);
    });
  }

  function clearAll() {
    inputEl.value = '';
    outputEl.value = '';
    statusEl.style.display = 'none';
    statsEl.textContent = '';
    inputEl.focus();
  }

  function loadSample() {
    inputEl.value = JSON.stringify({
      name: "Emmanuel",
      age: 15,
      city: "Port Harcourt",
      games: ["Minecraft", "Roblox"],
      isOnline: true,
      score: 1250
    }, null, 2);
    formatJSON();
  }