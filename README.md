# Dark and minimum userstyle for Wikipedia and Wikidata (or other Mediawiki site, Wikibase). You can set this style at the admin side of Wiki for your account - for  "vector legacy (2010)" theme, no browser extension needed.

<div align='center'>
    <a href='https://github.com/vitaly-zdanevich/wikipedia-userstyle-dark-minimum/raw/master/wikipedia-black.user.css' alt='Install with Stylus'>
        <img src='https://img.shields.io/badge/Install%20directly%20with-Stylus-116b59.svg?longCache=true&style=flat' />
    </a>
</div>

[Link for editing your Wikipedia CSS](https://meta.wikipedia.org/wiki/Special:MyPage/global.css) (remove @-moz-document block, with open and closing brackets).

![screenshot](/screenshot.png)

![screenshot](/screenshot-wikidata.png)


![screenshot](/screenshot-prefs.png)

Missing links to Edit, History, Wikidata - use [shortcuts](https://en.wikipedia.org/wiki/Wikipedia:Keyboard_shortcuts). Also you can append to an url of an article `&action=edit`, `&action=info`. Hotkey for Wikidata: Alt-Shift-G. To Edit source: Alt-Shift-E. Edit visual: Alt-Shift-V.

Want to see languages? Add [this JS](https://meta.wikimedia.org/wiki/User:Vitaly_Zdanevich/global.js) to your [global.js](https://meta.wikimedia.org/wiki/Special:MyPage/global.js) and you will have languages at the bottom:

```javascript
$(function() {
	if (mw.config.get( 'wgAction' ) == 'view') {
		lang = document.getElementById('p-lang')
		document.body.append(lang)
	}
})
```

About Wikimedia Commons uploading: this CSS hides checkbox with text
> I confirm that this work does not include material restricted by copyright, such as logos, posters, album covers, etc
> 
but this checkbox must be checked in order to continue - so you need to use this JavaScript:

```javascript
if (mw.config.get('wgPageName') == 'Special:UploadWizard') {
    // "I confirm that this work does not include material restricted by copyright, such as logos, posters, album covers, etc."

    const parent = document.getElementById('upload-wizard')
    const config = { attributes: true, childList: false, subtree: true }
    const observer = new MutationObserver(_ => {
        const node = document.querySelector('.mwe-upwiz-deed-compliance input')
        if (node && node.checked == false) {
            node.click()
            // I tried node.checked = true but it was not enough
        }
    })
    observer.observe(parent, config)
}
```

See my [related userscripts](https://greasyfork.org/en/users/22859-vitaly-zdanevich).
