# Dark and minimum userstyle for Wikipedia and Wikidata (or other Mediawiki site, Wikibase). You can set this style at the admin side of Wiki for your account - for  "vector legacy (2010)" theme, no browser extension needed.

[Link for editing your Wikipedia CSS](https://meta.wikipedia.org/wiki/Special:MyPage/global.css).

![screenshot](/screenshot.png)

![screenshot](/screenshot-wikidata.png)


![screenshot](/screenshot-prefs.png)

Missing links to Edit, History, Wikidata - use [shortcuts](https://en.wikipedia.org/wiki/Wikipedia:Keyboard_shortcuts). Also you can append to an url of an article `&action=edit`, `&action=info`. Hotkey for Wikidata: Alt-Shift-G. To Edit source: Alt-Shift-E. Edit visual: Alt-Shift-V.

Want to see languages? Add [this JS](https://meta.wikimedia.org/wiki/User:Vitaly_Zdanevich/global.js) to your [global.js](https://meta.wikimedia.org/wiki/Special:MyPage/global.js):

```javascript
$(function() {
	if (mw.config.get( 'wgAction' ) == 'view') {
		lang = document.getElementById('p-lang')
		document.body.append(lang)
	}
})
```
