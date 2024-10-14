console.log('2023.10.21')

import THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0'

const scene = new THREE.Scene()

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial())
plane.rotation.x = -1 * Math.PI / 2
plane.receiveShadow = true

const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshStandardMaterial())
sphere.position.y = 2
sphere.castShadow = true

const directionalLight = new THREE.DirectionalLight('white', 5)
directionalLight.position.set(3, 3, 0)
directionalLight.rotation.z = -1 * Math.PI / 4
directionalLight.castShadow = true
directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

scene.add(plane, sphere, directionalLight, directionalLightCameraHelper)

const camera = new THREE.PerspectiveCamera()
camera.position.set(0, 20, 25)
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

  orbitControls.update()

  window.requestAnimationFrame(render)
}

render()
