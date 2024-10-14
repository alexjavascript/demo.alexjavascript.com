console.log('Baked Alpha Shadow')
console.log('Date: 2023.10.23')

import THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0'

const scene = new THREE.Scene()

const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial())
sphere.position.y = 1

const textureLoader = new THREE.TextureLoader()

const texture = textureLoader.load('/public/images/work/4/simple-shadow.jpg')
const sphereShadowPlaneMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  alphaMap: texture,
  transparent: true,
})

const sphereShadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), sphereShadowPlaneMaterial)
sphereShadowPlane.rotation.x = -1 * Math.PI / 2

const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial())
plane.rotation.x = -1 * Math.PI / 2
plane.position.y = -0.01

const pointLight = new THREE.PointLight(0xffffff, 2, 30, 0.1)
pointLight.position.y = 20
const pointLightHelper = new THREE.PointLightHelper(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)

scene.add(
  sphere, 
  sphereShadowPlane, 
  plane, 
  pointLight,
  pointLightHelper,
  ambientLight,
)

const camera = new THREE.PerspectiveCamera()
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.position.set(0, 15, 30)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = -1 * orbitControls.autoRotateSpeed

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

document.body.append(renderer.domElement)

const clock = new THREE.Clock()

const render = () => {
  sphere.position.x = Math.sin(clock.getElapsedTime()) * 5
  sphere.position.z = Math.cos(clock.getElapsedTime()) * 5

  sphereShadowPlane.position.x = Math.sin(clock.getElapsedTime()) * 5
  sphereShadowPlane.position.z = Math.cos(clock.getElapsedTime()) * 5

  sphere.position.y = 1 + Math.abs(Math.sin(clock.getElapsedTime() * 3)) * 2
  sphereShadowPlane.material.opacity = 0.2 + (1 - Math.abs(Math.sin(clock.getElapsedTime() * 3))) * 0.3

  renderer.render(scene, camera)

  orbitControls.update()

  window.requestAnimationFrame(render)
}

render()
