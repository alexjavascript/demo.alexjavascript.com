import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' 
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera()
const renderer = new THREE.WebGLRenderer()

const pointLight = new THREE.PointLight('white', 8)
const ambientLight = new THREE.AmbientLight('white', 3)

pointLight.position.set(8, 8, 8)
scene.add(pointLight, ambientLight)

const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/public/js/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
  // "/public/models/Hamburger/hamburger-compressed.glb",
  "/public/models/Hamburger/hamburger.glb",
  (gltf) => {
    console.log({ gltf })
    gltf.scene.position.y = -2
    scene.add(gltf.scene)
  },
  () => {
    console.log('progress')
  },
  () => {
    console.log('error')
  }
)

camera.position.z = 24
camera.position.set(24, 24, 24)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
document.body.style.margin = '0'

document.body.append(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

const orbitControls = new OrbitControls(camera, renderer.domElement) 
orbitControls.enableDamping = true
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = orbitControls.autoRotateSpeed * -1

const render = () => {
  renderer.render(scene, camera)
  orbitControls.update()

  requestAnimationFrame(render)
}

render()
