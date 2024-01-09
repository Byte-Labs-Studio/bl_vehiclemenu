<script lang="ts">
    import { Send } from "@enums/events";
    import { SendEvent } from "@utils/eventsHandlers";


	let isMouseDown = false

	let moveHandler = (e: MouseEvent) => {
        if (!isMouseDown) return
		// console.log(e.movementX)
		let moveX = e.movementX
		let moveY = e.movementY
		// let x = moveX > 0 ? (moveX > 10 ? 10 : moveX) : (moveX < -10 ? -10 : moveX)
		// let y = moveY > 0 ? (moveY > 10 ? 10 : moveY) : (moveY < -10 ? -10 : moveY)
		let x = moveX / 8
		let y = moveY / 8
		SendEvent(Send.camMove, { x: x, y: y })
	}
	let scrollHandler = (e: WheelEvent) => {
		// console.log(e.deltaX, e.deltaY)
		let y = e.deltaY > 0 ? 0.5 : -0.5
		SendEvent(Send.camZoom, y)
	}
</script>




<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`w-full h-full cursor-grab active:cursor-grabbing`}
    on:mousedown={() => isMouseDown = true}
    on:mouseup={() => isMouseDown = false}
    on:wheel={scrollHandler}
    on:mousemove={moveHandler}
>
</div>