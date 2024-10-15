import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
      background-color: lightskyblue;
    }
  </style>

  <div id="app"></div>
`)

extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any
      x: any
    }
  }
}

const OrbitControl = () => {
  const { camera, gl } = useThree();

  return (
    <orbitControls args={ [camera, gl.domElement] } />
  )
}

const NUMBER_OF_TRIANGLES = 30

const Scene = () => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null!)

  useFrame((state, delta) => {
    console.log(state.clock.elapsedTime)
    state.camera.position.x = Math.sin(state.clock.elapsedTime / 10) * 6
    state.camera.position.z = Math.cos(state.clock.elapsedTime / 10) * 6
    state.camera.lookAt(0, 0, 0)

    // boxRef.current.rotateX(Math.PI / 3 * delta)
  })

  useEffect(() => {
    bufferGeometryRef.current.computeVertexNormals()
  }, [])

  const vertices = useMemo(() => new Float32Array(NUMBER_OF_TRIANGLES * 3 * 3).map(() => -0.5 + Math.random()), [])

  return (
    <group>
      <ambientLight intensity={0.1} />

      <pointLight intensity={16} position={[-2, 2, -2]} />
      <pointLight intensity={16} position={[-2, 2, 2]} />
      <pointLight intensity={16} position={[2, 2, -2]} />
      <pointLight intensity={16} position={[2, 2, 2]} />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial wireframe color="red" />
      </mesh>
      
      <mesh ref={boxRef} position-x={-1.5}>
        <sphereGeometry args={[0.65]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      <mesh>
        <bufferGeometry ref={bufferGeometryRef}>
          <bufferAttribute 
            attach='attributes-position'
            count={NUMBER_OF_TRIANGLES * 3}
            itemSize={3}
            array={vertices}
          />
        </bufferGeometry>
        <meshBasicMaterial color="tomato" side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={boxRef} position-x={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="purple" />
      </mesh>

      <mesh position-y={-1} rotation-x={Math.PI * -0.5}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="yellowgreen" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}



const App = () => {
  return (
    <Canvas 
      style={{ height: '100vh' }}
      // orthographic
      camera={{
        fov: 75,
        near: 0.1,
        far: 200,
        position: [0, 1, 1]
        // scale: 100,
      }}

      gl={{
        antialias: true, // false
        toneMapping: THREE.ACESFilmicToneMapping, // THREE.CineonToneMapping
        outputColorSpace: THREE.SRGBColorSpace, //THREE.LinearDisplayP3ColorSpace,
      }}
    >
      {/* <OrbitControl /> */}
      <Scene />
    </Canvas>
  )
}

const root = createRoot(document.body.querySelector('#app') as HTMLDivElement)
root.render(<App />)
