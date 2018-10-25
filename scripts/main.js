(function() {
  carousel(0);
  loadProducts();
  function carousel(imageIndex) {
    const images = document.getElementsByClassName("slider_image");
    const totalImages = images.length;
    const delay = 2000;
    for (let index = 0; index < totalImages; index++) {
      images[index].style.display = "none";
    }
    imageIndex = imageIndex || 0;
    if (imageIndex > totalImages - 1) {
      imageIndex = 0;
    }
    images[imageIndex].style.display = "block";

    setTimeout(() => {
      carousel(imageIndex + 1);
    }, delay);
  }

  function loadProducts() {
    const html = data => `
			<div class="product-card">
				<div class="product-image">
					${data.img}
				</div>
				<div class="product-info">
					<h5>Product Name</h5>
					<h6>0.00</h6>
				</div>
			</div>
		`;
    const products = document.getElementsByClassName("products");
    const imageData = JSON.parse(localStorage.getItem(IMAGES_CACHE_KEY)).data;
    imageData
      .filter(image => image.path.startsWith("products/"))
      .forEach((image, index) => {
        fetchBlob(image.sha).then(content => {
          const img = document.createElement("img");
          img.src = `data:image/png;base64, ${content}`;
          img.alt = `product_name_#${index}`;
          products[0].insertAdjacentHTML(
            "beforeend",
            html({ img: img.outerHTML })
          );
        });
      });
  }
})();
