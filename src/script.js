import './style.css';
import * as THREE from 'three';


/**
 * SCENE
 */
const scene = new THREE.Scene();



/**
 * LIGHT
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(200, 500, 300)
scene.add(directionalLight)


/**
 * CAMERA
 */
// Setting up camera
const aspectRatio = window.innerWidth/ window.innerHeight
const cameraWidth = 150
const cameraHeight = cameraWidth / aspectRatio

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraWidth / 2,
    cameraWidth / -2,0 ,1000
)
camera.position.set(200,200,200)
camera.lookAt(0,15,0)
scene.add(camera)


/**
 * TEXTURE
 */

 const getCarFrontTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext('2d');

    context.fillStyle = "#ffffff"
    context.fillRect(0,0,64,32)
    context.fillStyle = "#666666"
    context.fillRect(8,8,48,24)

    return new THREE.CanvasTexture(canvas)
}

const getCarSideTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width= 128
    canvas.height= 32
    const context = canvas.getContext('2d')

    context.fillStyle = "#ffffff"
    context.fillRect(0,0,128,32)
    context.fillStyle = "#666666"
    context.fillRect(10,8,38,24)
    context.fillRect(58,8,60,24)

    return new THREE.CanvasTexture(canvas)
}

/**
 * GEOMETRY
 */
 const createWheels = () =>{
    const geometry = new THREE.BoxBufferGeometry(12,25,32)
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const wheel = new THREE.Mesh(geometry, material)
    return wheel;
}

const createCar = ()=> {

    const car = new THREE.Group()
    const frontWheel = createWheels()
    frontWheel.position.y = 6
    frontWheel.position.x = 18
    car.add(frontWheel)

    const rearWheel = createWheels()
    rearWheel.position.y = 6
    rearWheel.position.x = -18
    car.add(rearWheel)

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,25,30),
        new THREE.MeshLambertMaterial({ color: 0x78b14b})
    )
    body.position.y = 12
    car.add(body)

    // Mapping Texture on the Cabin.

    const carFrontTexture = getCarFrontTexture()
    const leftSideTexture = getCarSideTexture()
    leftSideTexture.center = new THREE.Vector2(0.5,0.5)
    leftSideTexture.rotation = Math.PI
    leftSideTexture.flipY = false
    const rightSideTexture = getCarSideTexture()


    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(30,30,28),[
        new THREE.MeshLambertMaterial({ map: carFrontTexture}),
        new THREE.MeshLambertMaterial({ map: carFrontTexture}),
        new THREE.MeshLambertMaterial({ color: 0xffffff}),
        new THREE.MeshLambertMaterial({ color: 0xffffff}),
        new THREE.MeshLambertMaterial({ map: rightSideTexture}),
        new THREE.MeshLambertMaterial({ map: leftSideTexture})
    ]
    )
    cabin.position.y =35
    cabin.position.x= -8
    car.add(cabin)
    return car

}
const maruti = createCar()
maruti.rotation.y = 3
scene.add(maruti)





/**
 * RENDERER
 */
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement);


