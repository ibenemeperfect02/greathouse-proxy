export async function onRequest(context) {
  try {
    const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

    const incomingUrl = new URL(context.request.url);

    const targetUrl = new URL(GAS_BASE_URL);
    incomingUrl.searchParams.forEach(function(value, key) {
      targetUrl.searchParams.set(key, value);
    });

    let response;
    if (context.request.method === "POST") {
      const bodyText = await context.request.text();
      response = await fetch(targetUrl.toString(), {
        method: "POST",
        body: bodyText,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });
    } else {
      response = await fetch(targetUrl.toString());
    }

    const html = await response.text();

    return new Response(html, {
      status: response.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    });

  } catch (err) {
    return new Response(
      "Erreur proxy: " + (err && err.message ? err.message : String(err)),
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }
        }
