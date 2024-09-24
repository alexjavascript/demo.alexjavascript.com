import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera()
const renderer = new THREE.WebGLRenderer()

const mesh = new THREE.Mesh(new THREE.TorusGeometry(), new THREE.MeshBasicMaterial())
scene.add(mesh)

camera.position.z = 10

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

document.body.style.margin = '0'
document.body.append(renderer.domElement)

const render = () => {
  renderer.render(scene, camera)
  orbitControls.update()
  requestAnimationFrame(render)
}

render()