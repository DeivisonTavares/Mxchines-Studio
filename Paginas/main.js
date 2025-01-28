document.addEventListener("DOMContentLoaded", () => {
    // Rolagem suave para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Timer para o próximo drop
    const proximoDrop = new Date("2025-02-27T00:00:00").getTime()
  
    const atualizarContagem = setInterval(() => {
      const agora = new Date().getTime()
      const diferenca = proximoDrop - agora
  
      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
      const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
      const segundos = Math.floor((diferenca % (1000 * 60)) / 1000)
  
      document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`
  
      if (diferenca < 0) {
        clearInterval(atualizarContagem)
        document.getElementById("countdown").innerHTML = "O drop já começou!"
      }
    }, 1000)
  })
  
  