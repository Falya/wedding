export default function toSiteBuilder() {
	let headerButton = document.querySelector('.header-button__main'),
			footerButton = document.querySelector('.portfolio-button__main');

	function goToPage() {
		document.location.href = '../../site-builder.php'; 
	}

	headerButton.addEventListener('click', goToPage);
	footerButton.addEventListener('click', goToPage);
}
