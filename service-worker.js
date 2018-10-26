self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open("v1")
      .then(function(cache) {
        return cache.addAll([
          "/",
          "/product.html",
          "/blog.html",
          "/service.html",
          "/scripts/util.js",
          "/scripts/main.js",
          "/styles/style.css"
        ]);
      })
      .catch(function(error) {
        console.log("service worker installation failed with", error.message);
      })
  );
});
