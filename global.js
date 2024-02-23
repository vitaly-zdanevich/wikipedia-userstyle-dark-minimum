$(function() {
	// Languages to the buttom of the page.
	// This is useful when the left sidebar is not visiable,
	// I created this for my CSS userstyle https://github.com/vitaly-zdanevich/wikipedia-userstyle-dark-minimum
	if (mw.config.get('wgAction') == 'view') {
		lang = document.getElementById('p-lang')
		document.body.append(lang)
	}

	if (mw.config.get('wgPageName') == 'Special:UploadWizard') {
		// "I confirm that this work does not include material restricted by copyright, such as logos, posters, album covers, etc."

		const parent = document.getElementById('upload-wizard')
		const config = { attributes: true, childList: false, subtree: true }
		const observer = new MutationObserver(_ => {
			const node = document.querySelector('.mwe-upwiz-deed-compliance input')
			if (node) {
				node.click()
				// I tried node.checked = true but it was not enough
			}

			// "This work provides knowledge, instructions, or information to others."
			const knowledge = document.querySelector('[value="knowledge"]')
			if (knowledge) {
				//knowledge.click() do nothing :(
				knowledge.dispatchEvent(new MouseEvent('click'))
			}

			const cc = document.querySelector('[value="cc-by-sa-4.0"]')
			if (cc) {
				cc.click()
			}

			observer.disconnect()
		})
		observer.observe(parent, config)
	}
})

/* vim: set filetype=javascript: */
