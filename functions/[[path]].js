export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  const incomingUrl = new URL(context.request.url);
  const targetUrl = new URL(GAS_BASE_URL);
  incomingUrl.searchParams.forEach(function(value, key) {
    targetUrl.searchParams.set(key, value);
  });

  let response;
  if (context.request.method === "POST") {
    response = await fetch(targetUrl.toString(), {
      method: "POST",
      body: context.request.body,
      headers: { "Content-Type": context.request.headers.get("Content-Type") || "application/x-www-form-urlencoded" }
    });
  } else {
    response = await fetch(targetUrl.toString());
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html; charset=utf-8"
    }
  });
  }
