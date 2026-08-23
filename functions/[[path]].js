export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  try {
    const response = await fetch(GAS_BASE_URL);
    const html = await response.text();

    return new Response(
      "STATUS: " + response.status + "\nLENGTH: " + html.length + "\n\nCONTENU:\n" + html.slice(0, 500),
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  } catch (err) {
    return new Response("ERREUR FETCH: " + err.message, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
