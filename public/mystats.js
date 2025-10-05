console.log("mystats.js loaded");

const $ = (id) => document.getElementById(id);

$("check").addEventListener("click", async () => {
  const slug = $("slug").value.trim();
  const out = $("stats");
  if (!slug) {
    out.textContent = "Please enter a slug.";
    return;
  }

  try {
    const res = await fetch(`/api/${encodeURIComponent(slug)}/stats`);
    const text = await res.text();
    let data; try { data = JSON.parse(text); } catch { data = { error: text }; }

    if (res.ok) {
      out.innerHTML = `
        <h3>✅ Stats for <code>${data.shortId}</code></h3>
        <ul>
          <li><strong>Destination:</strong> <a href="${data.destination}" target="_blank">${data.destination}</a></li>
          <li><strong>Clicks:</strong> ${data.clicks}</li>
          <li><strong>Last Accessed:</strong> ${data.lastAccessedAt || "—"}</li>
          <li><strong>Created:</strong> ${data.createdAt}</li>
        </ul>
      `;
    } else {
      out.innerHTML = `❌ Error (${res.status}): ${data.error || "Not found"}`;
    }
  } catch (e) {
    console.error(e);
    out.textContent = "Network error. Is the server running?";
  }
});
