document.body.style.backgroundColor = "black"

document.body.innerHTML = `
  <style>
    body {
      margin: 0;
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      font-family: 'Arial';
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
      position: relative;
      display: block;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      font: inherit;
      aspect-ratio: 1;
    }

    img {
      display: block;
      width: 100%;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      color: white;
    }
  </style>

  <a href="/work/6">
    <span>2024.05.02 S</span>
  </a>

  <a>
    <span>half </span>
  </a>

  <a>
    <span>of a year</span>
  </a>

  <a>
    <span>later</span>
  </a>

  <a href="/work/5">
    <img src="/public/images/work/5/preview.jpg">
    <span>2023.11.03 R</span>
  </a>

  <a>
    <span>2023.11.08 W</span>
  </a>

  <a>
    <span>2023.11.07 T</span>
  </a>

  <a>
    <span>2023.11.06 M</span>
  </a>

  <a>
    <span>2023.11.05 Y</span>
  </a>

  <a>
    <span>2023.11.04 S</span>
  </a>

  <a>
    <span>2023.11.03 F</span>
  </a>

  <a>
    <span>2023.11.02 R</span>
  </a>
  
  <a>
    <span>2023.11.01 W</span>
  </a>
  
  <a>
    <span>2023.10.31 T</span>
  </a>
  
  <a>
    <span>2023.10.30 M</span>
  </a>
  
  <a>
    <span>2023.10.29 Y</span>
  </a>

  <a>
    <span>2023.10.28 S</span>
  </a>
  
  <a>
    <span>2023.10.27 F</span>
  </a>

  <a>
    <span>2023.10.26 R</span>
  </a>
  
  <a>
    <span>2023.10.25 W</span>
  </a>
  
  <a>
    <span>2023.10.24 T</span>
  </a>

  <a href="/work/4">
    <img src="/public/images/work/4/preview.png">
    <span>2023.10.23 M</span>
  </a>

  <a href="/work/3">
    <img src="/public/images/work/3/preview.png">
    <span>2023.10.22 Y</span>
  </a>

  <a href="/work/2">
    <img src="/public/images/work/2/preview.png">
    <span>2023.10.22 Y</span>
  </a>
  
  <a href="/work/1">
    <img src="/public/images/work/1/preview.png">
    <span>2023.10.21 S</span>
  </a>

  <a href="/work/0">
    <img src="/public/images/work/0/preview.jpg">
    <span>2023.10.20 F</span>
  </a>
`
