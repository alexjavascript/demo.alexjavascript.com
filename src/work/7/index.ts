import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0'

const scene = new THREE.Scene()

const count = 10_000
const vertices = new Float32Array(count)
for (let i = 0; i < count; i++) {
  vertices[i] = THREE.MathUtils.randFloatSpread(1)
}

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/public/images/work/7/particles/2.png')

const material = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
  color: 'pink',
  alphaMap: texture,
  transparent: true,
  depthTest: false,
})

const points = new THREE.Points(geometry, material)

scene.add(points)

const camera = new THREE.PerspectiveCamera()
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.position.set(0, 0, 0.5)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.autoRotateSpeed = -1
orbitControls.autoRotate = true

document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}, { passive: true })

const render = () => {
  renderer.render(scene, camera)

  orbitControls.update()

  window.requestAnimationFrame(render)
}

render()
