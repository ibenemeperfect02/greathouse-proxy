export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  const incomingUrl = new URL(context.request.url);
  const targetUrl = new URL(GAS_BASE_URL);

  incomingUrl.searchParams.forEach(function(value, key) {
    targetUrl.searchParams.set(key, value);
  });

  let response;
  try {
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
  } catch (err) {
    return new Response("Erreur proxy: " + err.message, { status: 502 });
  }

  const html = await response.text();

  return new Response(html, {
    status: response.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  });
          }
