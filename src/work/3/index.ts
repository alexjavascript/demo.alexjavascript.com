console.log('2023.10.22')

import THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0'

const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const planeTexture = textureLoader.load('/public/images/work/3/baked-shadow.jpg')
const planeMaterial = new THREE.MeshStandardMaterial({
  map: planeTexture
})

const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), planeMaterial)

plane.rotation.x = -1 * Math.PI / 2

const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial())
sphere.position.y = 1

const ambientLight = new THREE.AmbientLight('white', 0.5)

const directionalLight = new THREE.DirectionalLight('white', 2)
directionalLight.position.set(4, 4, 4)
directionalLight.rotation.z = -1 * Math.PI / 4

scene.add(
  plane, 
  sphere, 
  ambientLight,
  directionalLight,
)

const camera = new THREE.PerspectiveCamera()
camera.position.set(0, 25, 30)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = -1 * orbitControls.autoRotateSpeed

document.body.append(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const render = () => {
  renderer.render(scene, camera)

  orbitControls.update()
  window.requestAnimationFrame(render)
}

render()
