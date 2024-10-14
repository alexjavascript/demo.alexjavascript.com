console.log('2023.10.22')

import THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import dat from 'dat.gui'

document.body.style.margin = '0'

const scene = new THREE.Scene()

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial())
plane.rotation.x = -1 * Math.PI / 2
plane.receiveShadow = true

const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial())
sphere.position.y = 2
sphere.castShadow = true

const gui = new dat.GUI()

const directionalLight = new THREE.DirectionalLight('white', 5)
directionalLight.position.set(3, 3, 0)
directionalLight.rotation.z = -1 * Math.PI / 4

directionalLight.castShadow = true
directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048)

directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 8

directionalLight.shadow.camera.top = 3
directionalLight.shadow.camera.bottom = 0
directionalLight.shadow.camera.left = -1
directionalLight.shadow.camera.right = 1

gui.add(directionalLight.shadow.camera, 'near').min(0).max(10).step(1)
gui.add(directionalLight.shadow.camera, 'far').min(0).max(10).step(1)

gui.add(directionalLight.shadow.camera, 'top').min(0).max(10).step(1)
gui.add(directionalLight.shadow.camera, 'bottom').min(-10).max(0).step(1)
gui.add(directionalLight.shadow.camera, 'left').min(-10).max(0).step(1)
gui.add(directionalLight.shadow.camera, 'right').min(0).max(10).step(1)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

scene.add(plane, sphere, directionalLight, directionalLightCameraHelper)

const camera = new THREE.PerspectiveCamera()
camera.position.set(0, -10, 15)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.shadowMap.enabled = true

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

  directionalLight.shadow.camera.updateProjectionMatrix()
  directionalLightCameraHelper.update()

  orbitControls.update()
  window.requestAnimationFrame(render)
}

render()
