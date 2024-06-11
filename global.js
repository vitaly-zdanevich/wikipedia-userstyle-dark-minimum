// https://en.wikipedia.org/wiki/Wikipedia:Tools/Navigation_popups#Options
window.popupDelay = 0;
window.popupModifier = 'ctrl' // Other options: 'alt', 'shift', 'meta'

$(function() {
	// Languages to the buttom of the page.
	// This is useful when the left sidebar is not visiable,
	// I created this for my CSS userstyle https://github.com/vitaly-zdanevich/wikipedia-userstyle-dark-minimum
	if (mw.config.get('wgAction') == 'view') {
		lang = document.getElementById('p-lang')
		document.body.append(lang)
	}

	if (mw.config.get('wgPageName') == 'Special:UploadWizard') {

		const parent = document.getElementById('upload-wizard')
		const config = { attributes: true, childList: false, subtree: true }
		const observer = new MutationObserver(_ => {

			// "I confirm that this work does not include material restricted by copyright, such as logos, posters, album covers, etc."
			const node = document.querySelector('.mwe-upwiz-deed-compliance input')
			if (node && node.checked == false) {
				node.click()
				// I tried node.checked = true but it was not enough
			}

			// "What license do you want to publish this work under? All media on Commons should be published under a free license."
			const cc = document.querySelector('.mwe-upwiz-ownwork-license [value="cc-by-sa-4.0"]')
			if (cc && cc.checked == false) {
				cc.parentElement.nextSibling.click()
			}

			// "This work provides knowledge, instructions, or information to others."
			const knowledge = document.querySelector('[value="knowledge"]')
			if (knowledge && knowledge.checked == false) {
				knowledge.parentNode.nextSibling.click()
			}

			// "I do not know who the author is"
			const anon = document.querySelector('[name="authorUnknown"]')
			if (anon && anon.checked == false) {
				anon.click()
			}

			// I tried to hide this node by display:none - but in such case no click happen :(
			// opacity:0 works

			// observer.disconnect() is not needed here - because of many DOM updates -
			// on the first screen it will not find a checkbox and unsubscribe (I tried).
		})
		observer.observe(parent, config)
	}
})

/* vim: set filetype=javascript: */
