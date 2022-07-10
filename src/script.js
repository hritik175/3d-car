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
camera.lookAt(0,10,0)
scene.add(camera)

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

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(30,50,28),
        new THREE.MeshLambertMaterial({ color: 0xffffff})
    )
    cabin.position.y =24
    cabin.position.x= -8
    car.add(cabin)
    return car

}
const maruti = createCar()
scene.add(maruti)

/**
 * RENDERER
 */
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement);


