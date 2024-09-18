import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.insertAdjacentHTML(`beforeend`, `
  <style>
    body {
      cursor: none;
      margin: 0;
    }

    svg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100px;
    }
  </style>

  <svg width="100" height="100" version="1.0"><path style="stroke:white;stroke-width:10" d="M50 1v34zM50 65v35zM35 50H0zM100 50H65z"/><circle style="stroke:white;stroke-width:10" cx="50" cy="50" r="33" fill="none"/></svg>
`)

const svg = document.querySelector('svg') as SVGSVGElement;

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera()

const meshes: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = Array.from({ length: 3}, (_, index) => {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({ wireframe: true }))
  mesh.position.x = -3 + index * 3
  return mesh
})

scene.add(...meshes)

camera.aspect = window.innerWidth / window.innerHeight
camera.position.z = 10
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

document.body.append(renderer.domElement)

const raycaster = new THREE.Raycaster()
let intersects: THREE.Intersection<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>[] = [];

const mouse = new THREE.Vector2()
let mouseDown = false

window.addEventListener('mousedown', () => {
  mouseDown = true
})

window.addEventListener('mouseup', () => {
  mouseDown = false
})

window.addEventListener('mousemove', (event) => {
  mouse.set(event.clientX / window.innerWidth * 2 - 1, -1 * (event.clientY / window.innerHeight * 2 - 1))
  raycaster.setFromCamera(mouse, camera)

  svg.style.left = `${event.clientX - 50}px`
  svg.style.top = `${event.clientY - 50}px`
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)  
}, false)

window.addEventListener('click', () => {
  if (!intersects.length) {
    return;
  }

  meshes.forEach((mesh, index) => {
    intersects.forEach((intersect) => {
      if (intersect.object === mesh) {
        console.log(`Click on mesh #${index}`)
      }
    })
  })
})

const clock = new THREE.Clock();

const tick = () => {
  meshes.forEach((mesh, index) => {
    mesh.position.y = Math.sin(clock.getElapsedTime() + index * Math.PI / 2)
    mesh.material.color.set('lightgreen')
  })
 
  const currentIntersects: THREE.Intersection<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>[] = raycaster.intersectObjects(meshes)

  if (!intersects.length && currentIntersects.length) {
    console.log('mouse enter')
  } else if (intersects.length && !currentIntersects.length) {
    console.log('mouse leave')
  }

  intersects = currentIntersects

  if (intersects.length) {
    intersects.forEach(intersect => {
      const color = mouseDown ? 'red' : 'orange'
      intersect.object.material.color.set(color)
    })
  }
  
  orbitControls.update()
  
  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}

tick()
