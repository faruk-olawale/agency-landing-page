async function test() {
  const url = "https://www.google.com/search?q=emergency+plumber+sydney&gl=au&hl=en";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    },
  });
  console.log("Status:", res.status);
  const text = await res.text();
  const comAuLinks = text.match(/https?:\/\/[a-zA-Z0-9.-]+\.com\.au[^\s"']+/g) || [];
  const domains = Array.from(
    new Set(
      comAuLinks
        .map((u) => {
          try {
            return new URL(u).hostname.replace(/^www\./, "");
          } catch {
            return "";
          }
        })
        .filter(
          (d) =>
            d &&
            !d.includes("google") &&
            !d.includes("schema.org") &&
            !d.includes("gstatic") &&
            !d.includes("w3.org")
        )
    )
  );
  console.log("Found domains:", domains.length);
  console.log(domains.slice(0, 10));
}

test().catch(console.error);
