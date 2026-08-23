export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  const incomingUrl = new URL(context.request.url);
  const targetUrl = new URL(GAS_BASE_URL);
  incomingUrl.searchParams.forEach(function(value, key) {
    targetUrl.searchParams.set(key, value);
  });

  const commonHeaders = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9"
  };

  let response;
  if (context.request.method === "POST") {
    const bodyText = await context.request.text();
    response = await fetch(targetUrl.toString(), {
      method: "POST",
      body: bodyText,
      headers: Object.assign({}, commonHeaders, {
        "Content-Type": context.request.headers.get("Content-Type") || "application/x-www-form-urlencoded"
      })
    });
  } else {
    response = await fetch(targetUrl.toString(), { headers: commonHeaders });
  }

  const html = await response.text();

  return new Response(html, {
    status: response.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  });
        }
