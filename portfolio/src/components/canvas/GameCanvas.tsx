"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { useKeyboard } from "@/hooks/useKeyboard";
import * as THREE from "three";

/**
 * Room dimensions
 */
const ROOM = {
  width: 20,
  depth: 20,
  height: 4,
};

/**
 * Player physics
 */
const PLAYER = {
  height: 1.6,
  speed: 5,
  jumpForce: 5,
  gravity: -9.8,
  margin: 0.5,
};

function PlayerMovement() {
  const keys = useKeyboard();
  const { camera } = useThree();

  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();

  let velocityY = 0;
  let isGrounded = false;

  useFrame((_, delta: number) => {
    /* ---------- HORIZONTAL MOVEMENT ---------- */

    frontVector.set(
      0,
      0,
      Number(keys.current["KeyS"]) - Number(keys.current["KeyW"])
    );

    sideVector.set(
      Number(keys.current["KeyA"]) - Number(keys.current["KeyD"]),
      0,
      0
    );

    direction.subVectors(frontVector, sideVector);

    if (direction.lengthSq() > 0) {
      direction
        .normalize()
        .multiplyScalar(PLAYER.speed * delta);

      camera.translateX(direction.x);
      camera.translateZ(direction.z);
    }

    /* ---------- VERTICAL MOVEMENT (GRAVITY + JUMP) ---------- */

    // Jump (Space)
    if (keys.current["Space"] && isGrounded) {
      velocityY = PLAYER.jumpForce;
      isGrounded = false;
    }

    // Apply gravity
    velocityY += PLAYER.gravity * delta;
    camera.position.y += velocityY * delta;

    /* ---------- FLOOR COLLISION ---------- */

    const floorY = PLAYER.height;

    if (camera.position.y <= floorY) {
      camera.position.y = floorY;
      velocityY = 0;
      isGrounded = true;
    }

    /* ---------- WALL COLLISION ---------- */

    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -ROOM.width / 2 + PLAYER.margin,
      ROOM.width / 2 - PLAYER.margin
    );

    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -ROOM.depth / 2 + PLAYER.margin,
      ROOM.depth / 2 - PLAYER.margin
    );
  });

  return null;
}

export default function GameCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, PLAYER.height, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
      style={{ width: "100vw", height: "100vh", display: "block" }}
    >
      {/* Background */}
      <color attach="background" args={["#1a1a1a"]} />

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[ROOM.width, ROOM.depth]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, ROOM.height / 2, -ROOM.depth / 2]}>
        <boxGeometry args={[ROOM.width, ROOM.height, 0.3]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      <mesh position={[0, ROOM.height / 2, ROOM.depth / 2]}>
        <boxGeometry args={[ROOM.width, ROOM.height, 0.3]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      <mesh position={[-ROOM.width / 2, ROOM.height / 2, 0]}>
        <boxGeometry args={[0.3, ROOM.height, ROOM.depth]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      <mesh position={[ROOM.width / 2, ROOM.height / 2, 0]}>
        <boxGeometry args={[0.3, ROOM.height, ROOM.depth]} />
        <meshStandardMaterial color="#666" />
      </mesh>

      {/* FPS */}
      <PointerLockControls makeDefault />
      <PlayerMovement />
    </Canvas>
  );
}
