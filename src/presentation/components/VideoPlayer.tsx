import React from 'react';

interface CloudflareStreamVideoProps {
  /** El ID del video de Cloudflare Stream (el hash de 32 caracteres) */
  videoId: string;
  /** El subdominio de cliente que te asignó Cloudflare (ej: customer-v8q7z2elb2ftze3o) */
  customerDomain: string;
  /** Título accesible para el iframe */
  title?: string;
  /** Aspect ratio en porcentaje para mantener la proporción (por defecto 16:9 ~ 56.25%) */
  aspectRatioPadding?: string;
}

export const VideoPlayer: React.FC<CloudflareStreamVideoProps> = ({
  videoId,
  customerDomain,
  title = 'Video de reproducción',
  aspectRatioPadding = '56.25%',
}) => {
  // Construimos la URL del iframe con su poster automático
  const iframeSrc = `https://${customerDomain}.cloudflarestream.com/${videoId}/iframe?poster=${encodeURIComponent(
    `https://${customerDomain}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?height=600`
  )}`;

  return (
    <div
      style={{
        position: 'relative',
        paddingTop: aspectRatioPadding,
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#000', // Evita destellos blancos mientras carga el iframe
      }}
    >
      <iframe
        src={iframeSrc}
        title={title}
        loading="lazy"
        style={{
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  );
};