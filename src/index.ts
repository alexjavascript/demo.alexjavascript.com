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
    }

    video {
      width: 100%;
    }
  </style>
  
  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>

  <a href="/work/0">
    <video controls>
      <source src="/public/videos/work/0/demo.mp4">
    </video>
  </a>
`
