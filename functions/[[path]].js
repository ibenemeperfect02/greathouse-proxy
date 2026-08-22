export async function onRequest(context) {
  const GAS_BASE_URL = "https://script.google.com/macros/s/AKfycbwn7aIEEfG-sS-0dEgkGB1blmG9Kf7SAET-CGEnl2g3CkcDEmpZob3Jdm8fj0iJBatS/exec";

  const incomingUrl = new URL(context.request.url);
  const targetUrl = new URL(GAS_BASE_URL);

  // Copie tous les parametres de query (?page=admin, ?page=produit&id=..., etc.)
  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  // Prepare la requete vers GAS en gardant la meme methode (GET/POST)
  // et le meme corps si c'est un POST (ex: soumission de commande, google.script.run)
  const init = {
    method: context.request.method,
    headers: {
      "Content-Type": context.request.headers.get("Content-Type") || "text/plain"
    },
    redirect: "follow"
  };

  if (context.request.method === "POST") {
    init.body = await context.request.text();
  }

  let response;
  try {
    response = await fetch(targetUrl.toString(), init);
  } catch (err) {
    return new Response("Erreur de connexion au site. Reessayez dans un instant.", { status: 502 });
  }

  let html = await response.text();

  // Remplace toute reference visible a script.google.com ou googleusercontent.com
  // dans le HTML/JS retourne, pour qu'aucun lien interne ne redirige vers Google
  const proxyOrigin = incomingUrl.origin;
  html = html.split("https://script.google.com/macros/s").join(proxyOrigin);

  return new Response(html, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html; charset=utf-8",
      "X-Frame-Options": "",
      "Cache-Control": "no-store"
    }
  });
                                    }
