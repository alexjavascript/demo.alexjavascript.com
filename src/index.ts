document.body.style.backgroundColor = "black"

document.body.innerHTML = `
  <style>
    body {
      margin: 0;
      display: grid;
      grid-template-columns: repeat(1, 1fr);;
    }

    @media (min-width: 480px) {
      body {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 1200px) {
      body {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    a {
      display: block;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font: inherit;
    }

    img {
      display: block;
      width: 100%;
    }

    span {
      display: none;
    }
  </style>

  <a href="/work/2">
    <img src="/public/images/work/2/preview.png">
    <span>2023.10.22</span>
  </a>
  
  <a href="/work/1">
    <img src="/public/images/work/1/preview.png">
    <span>2023.10.21</span>
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
    <span>2023.10.20</span>
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
  </a>
`
