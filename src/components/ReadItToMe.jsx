import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Headphones } from 'lucide-react';

const ReadItToMe = ({ audioSrc, title = "Listen to this page" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Format time in mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle audio metadata loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc]);

  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 0.8;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Skip forward/backward
  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Vertical Tab Button - Left Side */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 bg-[#028393] text-white px-3 py-6 rounded-r-xl shadow-xl z-40 hover:bg-[#142d63] transition-all duration-300 group"
        style={{
          top: '40%',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
        whileHover={{ scale: 1.05, x: 2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
          <Headphones className="w-4 h-4 rotate-90 group-hover:animate-pulse" />
          Read It To Me
        </span>
      </motion.button>

      {/* Slide-Out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#028393] to-[#142d63] p-6 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#f65625] rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold">Read It To Me</h2>
                      <p className="text-white/80 text-sm">Audio Version</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Player Content */}
              <div className="flex-1 p-6 flex flex-col">
                {/* Track Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#142d63] mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm">
                    Sit back and let us read this to you.
                  </p>
                </div>

                {/* Waveform Visualization (Decorative) */}
                <div className="flex items-center justify-center gap-1 h-16 mb-8">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#028393] to-[#f65625] rounded-full"
                      animate={{
                        height: isPlaying
                          ? [12, Math.random() * 40 + 20, 12]
                          : 12
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isPlaying ? Infinity : 0,
                        repeatType: 'reverse',
                        delay: i * 0.05
                      }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    className="w-full h-2 bg-gray-200 rounded-full cursor-pointer group relative overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#028393] to-[#f65625] rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#028393] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  {/* Skip Back */}
                  <button
                    onClick={() => skip(-10)}
                    className="p-3 text-gray-500 hover:text-[#028393] hover:bg-[#028393]/10 rounded-full transition-all"
                    title="Skip back 10 seconds"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  {/* Play/Pause */}
                  <motion.button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-gradient-to-br from-[#028393] to-[#142d63] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-1" />
                    )}
                  </motion.button>

                  {/* Skip Forward */}
                  <button
                    onClick={() => skip(10)}
                    className="p-3 text-gray-500 hover:text-[#028393] hover:bg-[#028393]/10 rounded-full transition-all"
                    title="Skip forward 10 seconds"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <button
                    onClick={toggleMute}
                    className="p-2 text-gray-500 hover:text-[#028393] transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#028393]"
                    style={{
                      background: `linear-gradient(to right, #028393 0%, #028393 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Footer Note */}
                <div className="mt-6 p-4 bg-[#028393]/5 rounded-xl border border-[#028393]/10">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-bold text-[#028393]">Pro tip:</span> Listen while you commute, exercise, or take a walk. Let the content sink in.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReadItToMe;
