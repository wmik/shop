(function() {
	carousel(0);
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
})();
