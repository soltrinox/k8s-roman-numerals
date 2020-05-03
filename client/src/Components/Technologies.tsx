import React from 'react';
import ts from '../resources/ts.png';
import apollo from '../resources/apollo.svg';
import docker from '../resources/docker.png';
import fastify from '../resources/fastify.png';
import jest from '../resources/jest.png';
import k8s from '../resources/k8s.png';
import mongodb from '../resources/mongodb.png';
import react from '../resources/react.svg';
import redis from '../resources/redis.svg';
import nginx from '../resources/nginx.png';

export default function Technologies() {
	return (
		<div className="technologies">
			<h2>These are the technologies used to make this client work</h2>
			<div className="logos">
				<div>
					<img src={ts} alt="Typescript" />
					<h3>Typescript</h3>
				</div>
				<div>
					<img src={apollo} alt="Apollo" />
					<h3>Apollo</h3>
				</div>
				<div>
					<img src={docker} alt="Docker" />
					<h3>Docker</h3>
				</div>
				<div>
					<img src={fastify} alt="Fastify" />
					<h3>Fastify</h3>
				</div>
				<div>
					<img src={jest} alt="Jest" />
					<h3>Jest</h3>
				</div>
				<div>
					<img src={k8s} alt="Kubernetes" />
					<h3>Kubernetes</h3>
				</div>
				<div>
					<img src={redis} alt="Redis" />
					<h3>Redis</h3>
				</div>
				<div>
					<img src={mongodb} alt="Mongodb" />
					<h3>Mongodb</h3>
				</div>
				<div>
					<img src={react} alt="React" />
					<h3>React</h3>
				</div>
				<div>
					<img src={nginx} alt="Nginx" />
					<h3>Nginx</h3>
				</div>
			</div>
		</div>
	);
}
