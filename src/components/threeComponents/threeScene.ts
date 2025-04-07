import { useEffect, useRef } from "react";
import * as THREE from "three";
import img from "../../textures/tilesets/simple/tileset_brick_worn.png";

const ThreeScene = ({ lightPos }: { lightPos: number }) => {
	const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

	useEffect(() => {
		const scene = new THREE.Scene();
		const width = window.innerWidth;
		const height = window.innerHeight;

		const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.001, 1000);

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(width, height);
		document.body.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		const ambientLight = new THREE.AmbientLight(0xffffff);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
		directionalLightRef.current = directionalLight;
		scene.add(directionalLight);

		const texture = new THREE.TextureLoader().load(img);
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		const material = new THREE.MeshStandardMaterial({
			map: texture,
			color: new THREE.Color(0xffffff),
		});
		const cube = new THREE.Mesh(geometry, material);
		cube.scale.set(10, 10, 10);
		scene.add(cube);

		camera.position.z = 130;

		const animate = () => {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			if (rendererRef.current) {
				document.body.removeChild(rendererRef.current.domElement);
			}
		};
	}, []);

	// Обновление позиции света при изменении lightPos
	useEffect(() => {
		if (directionalLightRef.current) {
			const radius = 10;
			const angleInRadians = lightPos * (Math.PI / 180);
			const x = Math.cos(angleInRadians) * radius;
			const z = Math.sin(angleInRadians) * radius;

			directionalLightRef.current.position.set(x, 0, z);
		}
	}, [lightPos]);

	return null;
};

export default ThreeScene;
