import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'

document.body.style.margin = '0'

const gui = new dat.GUI()

const scene = new THREE.Scene()

const boxGeometry = new THREE.SphereGeometry()
const pointsMaterial = new THREE.PointsMaterial({
  sizeAttenuation: false,
  color: 'lightgreen'
})

const points = new THREE.Points(boxGeometry, pointsMaterial)

scene.add(points)

const camera = new THREE.PerspectiveCamera()
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.append(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = -1.0

const render = () => {
  renderer.render(scene, camera)
  
  orbitControls.update()

  window.requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}, { passive: true })