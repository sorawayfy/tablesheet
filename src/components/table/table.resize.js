import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  let value
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'

  $resizer.css({
    opacity: 1,
    right: 0,
    bottom: 0,
    [sideProp]: '-5000px',
  })

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.clientX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta +'px'})
    } else {
      const delta = e.clientY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}