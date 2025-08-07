## JS区分点按和长按事件
~~~typescript
let onmousedownTime: number | null = null
function onmousedown() {
	console.log("按钮按下了")
	onmousedownTime = new Date().getTime()
}

function onmouseup(place: DrawerPlacement, id: string) {
	console.log("按钮松开了")
	const onmouseupTime = new Date().getTime()
	if ((onmouseupTime - onmousedownTime!) > 250) {
		// 判断为长按
		console.log("长按")
	} else {
		// 判断为点按
		console.log("点按")

		// 弹出底部抽屉
		activate(place, id)
	}
}
~~~
思路：元素被按下时，记录当前时间戳，判断松开时记录的时间戳与按下时记录的时间戳的差值，若小于阈值，判断为点按，大于阈值判断为长按