export async function onRequest(context) {
  return new Response("BONJOUR TEST FONCTION", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
