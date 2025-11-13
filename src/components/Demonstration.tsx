import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'
import BlurText from './effectsComponents/BlurText'

const Demonstration = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const videoRef = useScrollReveal({ variant: 'fade-up', delay: 300 }) as React.RefObject<HTMLDivElement>

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-12 transition-colors duration-300 relative overflow-hidden">
			{/* Partículas de fondo sutiles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-float-slow top-20 left-10"></div>
				<div className="absolute w-56 h-56 bg-purple-400/10 rounded-full blur-3xl animate-float-medium top-40 right-20"></div>
				<div className="absolute w-32 h-32 bg-pink-400/15 rounded-full blur-2xl animate-float-fast bottom-40 left-1/4"></div>
			</div>

			<div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Back button */}
				<button
					onClick={() => navigate('/')}
					className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
				>
					<ChevronLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
					{t('demonstration.button')}
				</button>

				{/* Title Section */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<BlurText
						text={t('demonstration.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('demonstration.description')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-xl text-gray-600 dark:text-gray-300"
					/>
				</div>

				{/* Video Section con efectos mejorados */}
				<div ref={videoRef} className="relative flex justify-center mb-12">
					{/* Resplandor de fondo sutil en azul */}
					<div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl"></div>
					
					{/* Contenedor del video para formato vertical */}
					<div className="relative w-full max-w-md">
						<div className="relative group">
							{/* Borde decorativo animado en azul */}
							<div className="absolute -inset-1 bg-blue-600 dark:bg-blue-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
							
							{/* Video con aspect ratio vertical */}
							<div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-gray-900/5">
								<video
									src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos/SolHoub/Conspat%20x%20Solware%20(1)%20(1).mp4"
									className="w-full h-auto max-h-[70vh] object-contain"
									controls
									preload="metadata"
									playsInline
									controlsList="nodownload"
								>
									Tu navegador no soporta el elemento de video.
								</video>
							</div>
						</div>
					</div>
				</div>

				{/* Video Description con efectos mejorados */}
				<div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
						{t('demonstration.video.title')}
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300 text-lg leading-relaxed">
						{t('demonstration.video.description')}
					</p>

					{/* Key Points con diseño mejorado */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{[
							t('demonstration.video.points.0'),
							t('demonstration.video.points.1'),
							t('demonstration.video.points.2'),
							t('demonstration.video.points.3'),
						].map((point, index) => (
							<div 
								key={index} 
								className="flex items-start space-x-3 text-gray-700 dark:text-gray-300 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 transition-all duration-300 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 hover:scale-[1.02]"
							>
								<div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500 mt-2 flex-shrink-0" />
								<span className="leading-relaxed">{point}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Demonstration
