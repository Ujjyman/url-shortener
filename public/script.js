console.log("✅ script.js loaded");

document.getElementById("shorten").addEventListener("click", async () => {
  console.log("✅ Button clicked!");
  const destination = document.getElementById("url").value.trim();
  const customSlug = document.getElementById("slug").value.trim();

  if (!destination) {
    alert("Please enter a URL!");
    return;
  }

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, customSlug: customSlug || undefined }),
    });

    const data = await res.json();
    const resultDiv = document.getElementById("result");

    if (res.ok) {
      resultDiv.innerHTML = `
        ✅ Short URL: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>
      `;
    } else {
      resultDiv.innerHTML = `❌ Error (${res.status}): ${
        data.error || "Something went wrong"
      }`;
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Request failed. Check console for details.");
  }
});
