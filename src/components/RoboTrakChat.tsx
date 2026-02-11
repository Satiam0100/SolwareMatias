import { useEffect, useRef } from 'react'

interface RobotTrackingChatProps {
	className?: string
}

const RobotTrackingChat = ({ className = '' }: RobotTrackingChatProps) => {
	const lEyeBallRef = useRef<SVGGElement>(null)
	const rEyeBallRef = useRef<SVGGElement>(null)
	const lPupilRef = useRef<SVGGElement>(null)
	const rPupilRef = useRef<SVGGElement>(null)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!lEyeBallRef.current || !rEyeBallRef.current || !lPupilRef.current || !rPupilRef.current) return

			// Función para calcular el movimiento de la pupila dentro de una elipse
			const calculatePupilMovement = (
				eyeBall: SVGGElement,
				pupil: SVGGElement,
				eyeCenterX: number,
				eyeCenterY: number,
				pupilInitialX: number,
				pupilInitialY: number,
				eyeRadiusX: number,
				eyeRadiusY: number,
				pupilRadiusX: number,
				pupilRadiusY: number,
			) => {
				const svg = eyeBall.ownerSVGElement
				if (!svg) return

				// Obtener la transformación del SVG al viewport
				const svgPoint = svg.createSVGPoint()
				svgPoint.x = e.clientX
				svgPoint.y = e.clientY
				const ctm = svg.getScreenCTM()
				if (!ctm) return

				const inverseCTM = ctm.inverse()
				const svgCoords = svgPoint.matrixTransform(inverseCTM)

				// Calcular la posición relativa al centro del ojo
				const dx = svgCoords.x - eyeCenterX
				const dy = svgCoords.y - eyeCenterY

				// Calcular el radio máximo permitido (parte blanca - pupila)
				const maxRadiusX = eyeRadiusX - pupilRadiusX
				const maxRadiusY = eyeRadiusY - pupilRadiusY

				// Calcular la distancia desde el centro
				const distance = Math.sqrt(dx * dx + dy * dy)
				const angle = Math.atan2(dy, dx)

				// Calcular la distancia máxima permitida en esta dirección (elipse)
				// Usando la ecuación paramétrica de la elipse: r = (a*b) / sqrt(a²*sin²(θ) + b²*cos²(θ))
				const cosAngle = Math.cos(angle)
				const sinAngle = Math.sin(angle)
				const denominator = Math.sqrt(
					maxRadiusX * maxRadiusX * sinAngle * sinAngle + maxRadiusY * maxRadiusY * cosAngle * cosAngle,
				)

				// Evitar división por cero
				const maxDistance =
					denominator > 0.001 ? (maxRadiusX * maxRadiusY) / denominator : Math.min(maxRadiusX, maxRadiusY)

				// Limitar la distancia
				const limitedDistance = Math.min(distance, maxDistance)

				// Calcular la posición final relativa al centro del ojo
				const finalX = cosAngle * limitedDistance
				const finalY = sinAngle * limitedDistance

				// Calcular el desplazamiento desde la posición inicial de la pupila
				const offsetX = finalX - (pupilInitialX - eyeCenterX)
				const offsetY = finalY - (pupilInitialY - eyeCenterY)

				// Aplicar la transformación
				pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`
			}

			// Ojo izquierdo: parte blanca cx='183.13', cy='241.09', rx='56.04', ry='62.88'
			// Pupila izquierda inicial: cx='189.29', cy='241.09', rx='39.45', ry='45.65'
			calculatePupilMovement(
				lEyeBallRef.current,
				lPupilRef.current,
				183.13,
				241.09,
				189.29,
				241.09,
				56.04,
				62.88,
				39.45,
				45.65,
			)

			// Ojo derecho: parte blanca cx='372.38', cy='241.09', rx='56.04', ry='62.88'
			// Pupila derecha inicial: cx='366.21', cy='241.09', rx='39.45', ry='45.65'
			calculatePupilMovement(
				rEyeBallRef.current,
				rPupilRef.current,
				372.38,
				241.09,
				366.21,
				241.09,
				56.04,
				62.88,
				39.45,
				45.65,
			)
		}

		document.addEventListener('mousemove', handleMouseMove)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<div
			style={{
				margin: 0,
				padding: 0,
				display: 'flex',
				width: '100%',
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 647.42 450" className={className}>
				<defs>
					<style>{`
      .cls-1 {
        fill: #07004d;
      }

      .cls-1,
      .cls-2,
      .cls-3,
      .cls-4,
      .cls-5,
      .cls-6,
      .cls-7,
      .cls-8,
      .cls-9,
      .cls-10,
      .cls-11,
      .cls-12,
      .cls-13,
      .cls-14 {
        stroke-width: 0px;
      }

      .cls-2,
      .cls-8,
      .cls-11 {
        fill: #41e2b8;
      }

      .cls-3,
      .cls-10,
      .cls-13 {
        fill: #29536b;
      }

      .cls-4,
      .cls-5,
      .cls-8,
      .cls-10,
      .cls-11,
      .cls-15,
      .cls-13 {
        mix-blend-mode: multiply;
      }

      .cls-4,
      .cls-7 {
        fill: #4c87ff;
      }

      .cls-4,
      .cls-8,
      .cls-13 {
        opacity: 0.54;
      }

      .cls-16 {
        isolation: isolate;
      }

      .cls-5,
      .cls-14 {
        fill: #cfdee8;
      }

      .cls-6 {
        fill: none;
      }

      .cls-17 {
        clip-path: url(#clippath);
      }

      .cls-9 {
        mix-blend-mode: overlay;
      }

      .cls-9,
      .cls-12 {
        fill: #fefefe;
      }

      .cls-10 {
        opacity: 0.26;
      }

      .cls-18 {
        opacity: 0.59;
      }
    `}</style>
					<clipPath id="clippath">
						<rect className="cls-6" x="-1141.79" y="-1835.21" width="977" height="1350" />
					</clipPath>
				</defs>
				<g className="cls-16">
					<g id="Layer_2" data-name="Layer 2">
						<g>
							<path
								className="cls-14"
								d="M516.58,191.65C501.03,88.55,398.51,0,278.05,0h-.6c-36.06,0-70.51,7.93-101.5,21.81C94.46,58.33,36.88,135.98,36.88,218.68c0,36.33,3.5,68.48,13.29,95.82h0c24.07,67.25,86.12,105.46,227.28,105.46h.6c141.17,0,203.21-38.2,227.28-105.45h0c9.79-27.36,13.29-59.5,13.29-95.84,0-9.1-.7-18.12-2.05-27.03Z"
							/>
							<path
								className="cls-5"
								d="M505.34,314.51c-24.07,67.24-86.12,105.45-227.28,105.45h-.6c-141.17,0-203.21-38.2-227.28-105.45,4.66,6.3,9.88,12.35,15.73,18.08,42.03,41.18,109.25,60.37,211.55,60.37h.6c102.3,0,169.52-19.19,211.55-60.37,5.86-5.74,11.07-11.78,15.73-18.08Z"
							/>
							<path
								className="cls-3"
								d="M462.24,236.98c0-59.87-35.54-108.66-101.72-110.9h0s0,0,0,0c-1.58-.05-3.17-.09-4.78-.09-5.57,0-11.04.45-16.38,1.31-7.28,1.17-14.6,2.2-21.95,2.76-24.41,1.86-33.62,1.63-39.65,1.63s-15.23.23-39.65-1.63c-7.36-.56-14.67-1.58-21.95-2.76-5.34-.86-10.81-1.31-16.38-1.31-1.61,0-3.2.04-4.78.09,0,0,0,0,0,0h0c-66.18,2.24-101.72,51.03-101.72,110.9,0,72,19.2,116.51,184.48,116.51,144.29,0,184.48-44.51,184.48-116.51Z"
							/>
							<path
								className="cls-13"
								d="M293.17,608.57s.06-.02.11-.05c-4.09,3.98-9.68,6.42-15.83,6.42-12.59,0-22.8-10.21-22.8-22.8,0-3.16.65-6.16,1.81-8.89.56,3.1,1.31,6.16,2.36,9.13.24.71.53,1.43.8,2.14.02.05.05.11.06.16.02.04.04.07.05.11.05.07.07.16.11.23.16.32.31.65.47.97.65,1.32,1.36,2.6,2.15,3.84.34.54.7,1.06,1.06,1.56.06.08.12.17.19.24-.06-.08-.11-.17-.12-.19.02.02.13.16.35.5.01,0,.01.01.01.02t.01.02c.67.77,1.34,1.54,2.06,2.24.71.71,1.45,1.34,2.21,1.98.12.08.24.17.36.26.35.24.7.48,1.06.71.77.48,1.56.92,2.36,1.33.3.14.59.29.89.43.01,0,.02.01.04.01,1.2.44,2.41.85,3.66,1.14.53.13,1.07.24,1.6.32.02,0,.05.01.07.01,2.27.2,4.51.26,6.78.07.16-.01,1.07-.13,1.28-.14.02-.01.04-.01.05-.01h-.01c.17-.01.34-.04.49-.07.92-.16,1.85-.35,2.75-.59.91-.23,1.81-.49,2.69-.79.3-.11.59-.2.88-.32Z"
							/>
							<g>
								<path
									className="cls-10"
									d="M220.76,265.89c-2.54,2.03-5.15,3.86-7.9,5.49-1.09.63-2.66,1.93-3.88,2.1,1.01-.47,1.63-.77,1.86-.87-.15.03-.5.2-1.07.43-.59.27-1.15.5-1.75.7-2.93,1.16-5.92,2.06-8.97,2.73-.38.07-.8.17-1.21.27-.24.03-.44.07-.62.13.38-.07.95-.13,1.69-.27-.92.73-3.82.4-4.94.47-2.9.13-5.74-.07-8.64-.27h-.21c-1.63-.37-3.23-.7-4.82-1.16-2.01-.57-6.84-1.3-8.23-2.96.33.17.59.3.83.4-.38-.2-.77-.4-1.12-.6-1.48-.8-2.96-1.66-4.38-2.6-1.24-.83-2.46-1.7-3.67-2.6-.5-.37-1.04-.77-1.54-1.16-.18-.13-.33-.27-.44-.37.27.27.62.57,1.09.96-2.1-.9-4.68-4.59-6.18-6.39-.77-.93-2.9-2.83-3.14-4.06.44.63.86,1.26,1.3,1.9-.47-.73-.92-1.46-1.36-2.2-1.42-2.4-2.34-5.46-3.79-7.79-.21-.63-.38-1.26-.56-1.9-.36-1.3-.65-2.6-.89-3.89-.06-.27-.12-.57-.15-.86,0,0-.03,0,0-.03,0-.13-.03-.3-.03-.47,0-1.33-.12-2.7-.09-4.03,0-.87.06-1.73.12-2.6v-.1c.21-1.03.5-2.3.56-2.6.21-.87.44-1.7.71-2.56.18-.57.3-.93.36-1.13,0,0-.03,0,0-.03,0,0,.03,0,.03-.03v-.03s.03-.03.03-.07c.59-1.03,1.24-2.03,1.39-2.33,4.91-8.88,1.95-22.36-6.36-27.32-.59-.37-1.21-.67-1.81-.93-7.69,6.62-13.85,15.41-17.66,25.59-2.87,7.59-4.47,15.91-4.47,24.66,0,34.91,25.18,63.22,56.22,63.22,15.15,0,28.94-6.75,39.03-17.8,7.37-7.95,12.81-18.2,15.42-29.71-3.7-.67-7.49.07-10.77,2.66ZM149.63,228.19c-.15.37-.38,1.06-.74,2.03-.12-.27.24-1.1.74-2.03Z"
								/>
								{/* parte blanca ojo */}
								<g className="eyeball" ref={lEyeBallRef}>
									<ellipse className="cls-12" cx="183.13" cy="241.09" rx="56.04" ry="62.88" />
								</g>
								{/* Ojo izquierdo pupila*/}
								<g ref={lPupilRef} className="l-pupil">
									<ellipse className="cls-1" cx="189.29" cy="241.09" rx="39.45" ry="45.65" />
									<ellipse className="cls-12" cx="202.86" cy="215.18" rx="9.86" ry="9.87" />
									<ellipse className="cls-12" cx="212.72" cy="231.21" rx="3.7" ry="3.7" />
								</g>
							</g>
							<g>
								<path
									className="cls-10"
									d="M323.98,263.23c2.6,11.51,8.05,21.76,15.42,29.71,10.09,11.05,23.88,17.8,39.03,17.8,31.04,0,56.22-28.32,56.22-63.22,0-8.75-1.6-17.07-4.47-24.66-3.82-10.18-9.97-18.97-17.66-25.59-.59.27-1.21.57-1.81.93-8.31,4.96-11.27,18.43-6.36,27.32.15.3.8,1.3,1.39,2.33,0,.03,0,.07.03.07v.03s.03.03.03.03c.03.03,0,.03,0,.03.06.2.18.57.36,1.13.27.87.5,1.7.71,2.56.06.3.36,1.56.56,2.6v.1c.06.87.12,1.73.12,2.6.03,1.33-.09,2.7-.09,4.03,0,.17-.03.33-.03.47.03.03,0,.03,0,.03-.03.3-.09.6-.15.86-.24,1.3-.53,2.6-.89,3.89-.18.63-.36,1.26-.56,1.9-1.45,2.33-2.37,5.39-3.79,7.79-.44.73-.89,1.46-1.36,2.2.44-.63.86-1.26,1.3-1.9-.24,1.23-2.37,3.13-3.14,4.06-1.51,1.8-4.08,5.49-6.18,6.39.47-.4.83-.7,1.09-.96-.12.1-.27.23-.44.37-.5.4-1.04.8-1.54,1.16-1.21.9-2.43,1.76-3.67,2.6-1.42.93-2.9,1.8-4.38,2.6-.36.2-.74.4-1.12.6.24-.1.5-.23.83-.4-1.39,1.66-6.21,2.4-8.23,2.96-1.6.47-3.2.8-4.82,1.16h-.21c-2.9.2-5.74.4-8.64.27-1.12-.07-4.02.27-4.94-.47.74.13,1.3.2,1.69.27-.18-.07-.38-.1-.62-.13-.41-.1-.83-.2-1.21-.27-3.05-.67-6.04-1.56-8.97-2.73-.59-.2-1.15-.43-1.75-.7-.56-.23-.92-.4-1.07-.43.24.1.86.4,1.86.87-1.21-.17-2.78-1.46-3.88-2.1-2.75-1.63-5.36-3.46-7.9-5.49-3.28-2.6-7.07-3.33-10.77-2.66ZM406.62,230.22c-.36-.96-.59-1.66-.74-2.03.5.93.86,1.76.74,2.03Z"
								/>
								{/* parte blanca del ojo */}
								<g className="eyeball" ref={rEyeBallRef}>
									<ellipse className="cls-12" cx="372.38" cy="241.09" rx="56.04" ry="62.88" />
								</g>
								{/* Ojo derecho pupila */}
								<g ref={rPupilRef} className="r-pupil">
									<ellipse className="cls-1" cx="366.21" cy="241.09" rx="39.45" ry="45.65" />
									<ellipse className="cls-12" cx="352.65" cy="215.18" rx="9.86" ry="9.87" />
									<ellipse className="cls-12" cx="342.79" cy="231.21" rx="3.7" ry="3.7" />
								</g>
							</g>
							<path
								className="cls-10"
								d="M248.07,305.33c5.87,6.23,13.95,10.62,22.43,11.95,8.97,1.4,18-.12,25.95-4.57,4.16-2.33,7.97-5.46,11-9.15,1.79-2.18,2.29-5.53,0-7.64-1.98-1.82-5.72-2.33-7.64,0-1.51,1.84-3.18,3.48-5.01,5-.48.38-.49.39-.03.02-.25.19-.51.37-.77.55-.39.27-.78.54-1.18.79-.93.6-1.89,1.15-2.87,1.66-.56.29-1.13.55-1.7.82-.57.25-.58.25-.02.01-.29.12-.59.23-.88.34-1.04.38-2.09.72-3.15,1s-2.15.49-3.23.7c-.63.1-.62.1.03,0-.31.04-.63.07-.94.1-.55.05-1.1.09-1.65.11-1.2.05-2.4.03-3.6-.05-.48-.03-.96-.08-1.44-.13-.64-.08-.64-.08,0,0-.32-.05-.63-.1-.95-.16-2.3-.42-4.49-1.13-6.69-1.93-.36-.14-.3-.12.18.08-.29-.13-.59-.26-.88-.4-.58-.27-1.15-.56-1.72-.87-.99-.53-1.95-1.12-2.88-1.74-.53-.36-1.06-.73-1.56-1.12.74.57-.19-.17-.4-.36-.98-.83-1.9-1.73-2.77-2.66-1.94-2.06-5.7-2.1-7.64,0-2.03,2.21-2.07,5.44,0,7.64h0Z"
							/>
							<path
								className="cls-10"
								d="M411.67,329.9c-28.63,15.26-71.55,23.59-133.92,23.59-124.96,0-166.41-25.44-179.2-68.97,5.45,10.19,12.99,19.59,23.42,27.84,30.73,24.3,81.74,35.13,165.38,35.13,52.17,0,93.26-5.78,124.32-17.59Z"
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
	)
}

export default RobotTrackingChat
