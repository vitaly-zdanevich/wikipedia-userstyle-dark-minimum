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

			if (!setPreviousCategories.isStarted && document.querySelector('.oo-ui-draggableGroupElement') && !document.querySelector('#prevCats'))
				setPreviousCategories()

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

// TODO to userscript - publish to greasyfork and Commons userscript (userscript of another type)
function setPreviousCategories() {
	setPreviousCategories.isStarted = true

	// https://www.mediawiki.org/wiki/API:Usercontribs
	fetch(`https://commons.wikimedia.org/w/api.php?action=query&list=usercontribs&uclimit=1&ucuser=${mw.user.getName()}&format=json`)
		.then(resp => resp.json())
		.then(j => {
			const filename = j['query']['usercontribs'][0]['title']
			// https://www.mediawiki.org/w/api.php?action=help&modules=query:categories
			fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=categories&meta=&titles=${filename}&formatversion=2&clshow=!hidden`)
				.then(resp => resp.json())
				.then(j => {
					const cats = j['query']['pages'][0]['categories']
						.reduce(reducer, [])
					const div = document.createElement('div')
					div.id = 'prevCats'
					const a = document.createElement('a')
					a.innerText = 'Previous:\n'
					a.href = '//commons.wikimedia.org/wiki/' + filename
					document.querySelector('.oo-ui-draggableGroupElement').append(a, ...cats)
				})
		})
}
function reducer(acc, cur) {
	const a = document.createElement('a')
	a.innerText = cur['title'].replace('Category:', '')
	a.href = '//commons.wikimedia.org/wiki/' + cur['title']
	a.style = 'display: block'
	acc.push(a)
	return acc
}

/* vim: set filetype=javascript: */
