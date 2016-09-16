export const game_pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export function getPageName(page) {
  switch(game_pages.indexOf(page)) {
    case 0: return "待機"
    case 1: return "説明"
    case 2: return "実験"
    case 3: return "結果"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "shopA": return "店A"
    case "shopB": return "店B"
    default:     return "見学者"
  }
}

export function getStateName(state) {
  switch(state) {
    case "during"    : return "実験中"
    case "finished"  : return "終了"
  }
}
