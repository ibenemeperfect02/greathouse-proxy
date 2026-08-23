export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  const commonHeaders = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
  };

  try {
    const response = await fetch(GAS_BASE_URL, { headers: commonHeaders });
    const html = await response.text();

    return new Response(
      "STATUS: " + response.status + "\nLENGTH: " + html.length + "\n\nDEBUT:\n" + html.slice(0, 300) + "\n\nFIN:\n" + html.slice(-800),
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  } catch (err) {
    return new Response("ERREUR: " + err.message, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
