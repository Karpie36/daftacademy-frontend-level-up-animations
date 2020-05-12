import {visibleHeightAtZDepth, visibleWidthAtZDepth, lerp} from "../utils.js"
import {nextSlide, previousSlide} from "../main.js"

const raycaster = new THREE.Raycaster()
const objLoader = [new THREE.OBJLoader(), new THREE.OBJLoader()]
let arrowBox = []
let arrowBoxRotation = [0,0]

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight)

const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

document.body.append(renderer.domElement)

objLoader[0].load(
    'models/cube.obj',
    ({children}) => {
      const screenBorderRight = visibleWidthAtZDepth(-10, camera) / 2
      const screenBottom = -visibleHeightAtZDepth(-10, camera) / 2

      addCube(children[0], nextSlide, screenBorderRight - 1.5, screenBottom + 1, 0)

      animateNextSlideCube()
    }
)

objLoader[1].load(
    'models/cube.obj',
    ({children}) => {
      const screenBorderRight = visibleWidthAtZDepth(-10, camera) / 2
      const screenBottom = -visibleHeightAtZDepth(-10, camera) / 2

      addCube(children[0], previousSlide, screenBorderRight - 2.5, screenBottom + 1, 1)

      animatePreviousSlideCube()
    }
)

const addCube = (object, callbackFn, x, y, index) => {
  const cubeMesh = object.clone()

  cubeMesh.scale.setScalar(.3)
  index!==1 ? cubeMesh.rotation.set(THREE.Math.degToRad(90), 0, 0) : cubeMesh.rotation.set(THREE.Math.degToRad(90), THREE.Math.degToRad(180), 0)

  const boundingBox = new THREE.Mesh(
      new THREE.BoxGeometry(.7, .7, .7),
      new THREE.MeshBasicMaterial({transparent: true, opacity: 0})
  )

  boundingBox.position.x = x
  boundingBox.position.y = y
  boundingBox.position.z = -10

  boundingBox.add(cubeMesh)

  boundingBox.callbackFn = callbackFn

  arrowBox[index] = boundingBox
  scene.add(boundingBox)
}

const animateNextSlideCube = () => {
  arrowBoxRotation[0] = lerp(arrowBoxRotation[0], 0, .07)
  arrowBox[0].rotation.set(THREE.Math.degToRad(arrowBoxRotation[0]), 0, 0)

  renderer.render(scene, camera)
  requestAnimationFrame(animateNextSlideCube)
}

const animatePreviousSlideCube = () => {
  arrowBoxRotation[1] = lerp(arrowBoxRotation[1], 0, .07)
  arrowBox[1].rotation.set(THREE.Math.degToRad(arrowBoxRotation[1]), 0, 0)

  renderer.render(scene, camera)
  requestAnimationFrame(animatePreviousSlideCube)
}

export const handleThreeNextSlideAnimation = (rotation) => {
  arrowBoxRotation[0] = rotation
}

export const handleThreePreviousSlideAnimation = (rotation) => {
  arrowBoxRotation[1] = rotation
}

window.addEventListener('click', () => {
  const mousePosition = new THREE.Vector2()
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mousePosition, camera)

  const interesctedObjects = raycaster.intersectObjects([arrowBox[0], arrowBox[1]])
  if(interesctedObjects.length) {
    interesctedObjects[0].object.callbackFn()
  }
})