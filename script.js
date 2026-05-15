const nav = document.getElementById("navbar")
let last = 0

window.addEventListener("scroll", () => {
  const y = scrollY
  nav.style.transform = y > last && y > 120 ? "translate(-50%,-115px)" : "translateX(-50%)"
  last = y
})

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show")
      io.unobserve(entry.target)
    }
  })
},{threshold:.14})

document.querySelectorAll(".reveal").forEach(el => io.observe(el))

document.querySelectorAll("[data-count]").forEach(el=>{
  const target = Number(el.dataset.count)
  let done = false
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !done){
        done = true
        let start = performance.now()
        function tick(now){
          const p = Math.min((now-start)/1100,1)
          const val = target * (1-Math.pow(1-p,3))
          el.textContent = Math.round(val)
          if(p<1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
  },{threshold:.5})
  obs.observe(el)
})

if(matchMedia("(min-width: 921px)").matches){
  const frame = document.querySelector(".blade-frame")
  window.addEventListener("mousemove", e => {
    const x = (e.clientX / innerWidth - .5) * 10
    const y = (e.clientY / innerHeight - .5) * 10
    if(frame) frame.style.transform = `translate3d(${x}px,${y}px,0)`
  })
}
