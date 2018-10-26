self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open("v1")
      .then(function(cache) {
        return cache.addAll([
          "/shop/",
          "/shop/index.html",
          "/shop/product.html",
          "/shop/blog.html",
          "/shop/service.html",
          "/shop/scripts/util.js",
          "/shop/scripts/main.js",
          "/shop/styles/style.css"
        ]);
      })
      .catch(function(error) {
        console.log("service worker installation failed with", error.message);
      })
  );
});
