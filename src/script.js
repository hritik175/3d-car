import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

/**
 * SCENE
 */
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper( 90 );
scene.add( axesHelper );

/*
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
// const cameraWidth = 150
// const cameraHeight = cameraWidth / aspectRatio

// const camera = new THREE.OrthographicCamera(
//     cameraWidth / -2,
//     cameraWidth / 2,
//     cameraWidth / 2,
//     cameraWidth / -2,0 ,1000
// )
// camera.position.set(200,200,200)
const camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000)
camera.position.set(250,250,250);
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
    context.fillRect(0,0,0,20)
    context.fillStyle = "#666666"
    context.fillRect(10,8,38,24)
    context.fillRect(58,8,60,24)

    return new THREE.CanvasTexture(canvas)
}

/**
 * GEOMETRY
 */
 const createWheels = () =>{
    const geometry = new THREE.CylinderBufferGeometry(10,10,45,32)
    const material = new THREE.MeshLambertMaterial({ color: 0x333333 })
    const wheel = new THREE.Mesh(geometry, material)
    wheel.rotateX(Math.PI * 0.5)    // For rotating along any axis
    return wheel;
}

const createCar = ()=> {

    const car = new THREE.Group()
    const frontWheel = createWheels()
    frontWheel.position.y = 6
    frontWheel.position.x = 22
    car.add(frontWheel)

    const rearWheel = createWheels()
    rearWheel.position.y = 6
    rearWheel.position.x = -24
    car.add(rearWheel)

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(80,20,40),
        new THREE.MeshLambertMaterial({ color: 0x78b14b})
    )
    body.position.y = 12
    car.add(body)
        // Car Head Lights
    const headLightLeft = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(4,4,20,32),
        new THREE.MeshLambertMaterial({color: '#f7ff29'})
    )
    headLightLeft.rotateZ(Math.PI * 0.5)
    headLightLeft.position.set(31,15,12)
    car.add(headLightLeft)

    const headLightRight = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(4,4,20,32),
        new THREE.MeshLambertMaterial({color: '#f7ff29'})
    )
    headLightRight.rotateZ(Math.PI * 0.5)
    headLightRight.position.set(31,15,-12)
    car.add(headLightRight)

    // Car Tail Lights
    const tailLightLeft = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4,9,10),
        new THREE.MeshLambertMaterial({color: '#fa2020'})
    )
    tailLightLeft.rotateZ(Math.PI * 0.5)
    tailLightLeft.position.set(-36,15,12)
    car.add(tailLightLeft)

    const tailLightRight = new THREE.Mesh(
        new THREE.CylinderBufferGeometry(4,4,20,32),
        new THREE.MeshLambertMaterial({color: '#fa2020'})
    )
    tailLightRight.rotateZ(Math.PI * 0.5)
    tailLightRight.position.set(-31,15,-12)
    car.add(tailLightRight)

    // Mapping Texture on the Cabin.

    const carFrontTexture = getCarFrontTexture()
    const leftSideTexture = getCarSideTexture()
    leftSideTexture.center = new THREE.Vector2(0.5,0.5)
    leftSideTexture.rotation = Math.PI
    leftSideTexture.flipY = false
    const rightSideTexture = getCarSideTexture()


    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(40,15,35),[
        new THREE.MeshLambertMaterial({ map: carFrontTexture}),
        new THREE.MeshLambertMaterial({ map: carFrontTexture}),
        new THREE.MeshLambertMaterial({ color: 0xffffff}),
        new THREE.MeshLambertMaterial({ color: 0xffffff}),
        new THREE.MeshLambertMaterial({ map: rightSideTexture}),
        new THREE.MeshLambertMaterial({ map: leftSideTexture})
    ]
    )
    cabin.position.y =28
    cabin.position.x= -8
    car.add(cabin)
    return car

}
const maruti = createCar()
scene.add(maruti)

//GSAP library
// gsap.to(maruti.position, {duration: 3, delay: 1, x: 200})
// gsap.to(maruti.position, {duration: 4, delay: 5, x: 0})



/**
 * RENDERER
 */
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

/**
 * CONTROLS
 */
const control = new OrbitControls(camera, renderer.domElement)
control.enableDamping = true
control.maxPolarAngle = Math.PI /2.5
control.minDistance = 100
control.update()


/**
 * ANIMATION
 */
const animate = () =>{
    
    control.update()
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}
animate();  