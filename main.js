import './style.css'

import * as THREE from 'three'
import { BufferGeometryLoader, Camera, GridHelper, TextureLoader } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(7)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(12, 3, 15, 50)
const material = new THREE.MeshStandardMaterial({ color: 0xdb6363 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointlight1 = new THREE.PointLight(0xFFFFFF)
const pointlight2 = new THREE.PointLight(0xFFFFFF)
pointlight1.position.set(0, 0, 0)
pointlight2.position.set(25, 20, 20)

const ambientlight = new THREE.AmbientLight(0x240202)
scene.add(pointlight1, pointlight2, ambientlight)

const lighthelper1 = new THREE.PointLightHelper(pointlight1)
const lighthelper2 = new THREE.PointLightHelper(pointlight2)
const grighelper = new THREE.GridHelper(200, 50)
//scene.add(lighthelper1, lighthelper2, grighelper)

const controls = new OrbitControls(camera, renderer.domElement)


function addStar() {
  const geometry = new THREE.SphereGeometry(0.08, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(500).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('./space_background.jpg')
scene.background = spaceTexture

const meTexture = new THREE.TextureLoader().load('./gosling.jpg')

const me = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3.5, 5),
  new THREE.MeshBasicMaterial({ map: meTexture })
)

scene.add(me)

const earthTexture = new THREE.TextureLoader().load('./earthmap.jpg')
const earthNoraml = new THREE.TextureLoader().load('./earthnormal.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    bumpMap: earthNoraml,
    
  })
)
earth.position.set(12, 10, 10)
scene.add(earth)

function moveCamera(){

  const t = document.body.getBoundingClientRect().top

  me.rotation.x+=0.01

  camera.position.z=t*-0.1 + 7
  camera.position.x=t*-0.002
  


}
document.body.onscroll = moveCamera

function animation() {
  requestAnimationFrame(animation)

  torus.rotation.x += 0.008
  torus.rotation.y += 0.005
  torus.rotation.z += 0.001
  earth.rotation.y += 0.0005

  controls.update()

  renderer.render(scene, camera)
}

animation()